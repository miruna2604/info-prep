import os

import pytest
from fastapi.testclient import TestClient


# This must happen before importing app.main. Importing app.main creates the
# database tables using the DATABASE_URL that is active at import time.
TEST_DATABASE_URL = os.getenv(
    "TEST_DATABASE_URL",
    "postgresql+psycopg2://test_user:test_password@localhost:5434/app_database_test",
)

if not TEST_DATABASE_URL.rsplit("/", maxsplit=1)[-1].endswith("_test"):
    raise RuntimeError("Refusing to run tests against a database without a _test suffix")

os.environ["DATABASE_URL"] = TEST_DATABASE_URL

from app.database.database import Base, SessionLocal, engine, get_db  # noqa: E402
from app.database.schemas.chapter import Chapter  # noqa: E402
from app.database.schemas.pb_test import ProblemTest  # noqa: E402
from app.database.schemas.problem import Problem  # noqa: E402
from app.database.schemas.user import User  # noqa: E402
from app.database.schemas.user_submission import UserSubmission  # noqa: F401, E402
from app.database.schemas.lesson import Lesson  # noqa: E402
from app.main import app  # noqa: E402


def seed_test_data(db):
    user = User(
        id=1,
        username="test-user",
        email="test@example.com",
        password_hash="not-a-real-password",
    )
    chapter = Chapter(id=1, title="Test chapter", display_order=1)
    lesson = Lesson(
        id=1,
        chapter_id=1,
        title="Prima lecție",
        video_url="https://example.com/video",
        pdf_url="https://example.com/lesson.pdf",
        display_order=1,
    )
    problem = Problem(
        id=1,
        chapter_id=1,
        title="Suma a doua numere",
        statement="Calculeaza suma.",
        input_description="Doua numere intregi.",
        output_description="Suma numerelor.",
        sample_input="2 3",
        sample_output="5",
    )
    tests = [
        ProblemTest(problem_id=1, input=input_data, expected_output=output, is_hidden=hidden)
        for input_data, output, hidden in [
            ("2 3", "5", False),
            ("10 20", "30", True),
            ("-5 8", "3", True),
            ("100 200", "300", True),
            ("0 0", "0", True),
        ]
    ]

    db.add_all([user, chapter, lesson, problem, *tests])
    db.commit()


@pytest.fixture
def client():
    # Every test starts with a fresh schema and only the data it needs.
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    with SessionLocal() as db:
        seed_test_data(db)

    def override_get_db():
        with SessionLocal() as db:
            yield db

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()

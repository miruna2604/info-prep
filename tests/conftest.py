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
from app.database.schemas.quiz import Quiz, QuizOption, QuizQuestion  # noqa: E402
from app.database.schemas.user import User  # noqa: E402
from app.database.schemas.user_submission import UserSubmission  # noqa: F401, E402
from app.database.schemas.lesson import Lesson  # noqa: E402
from app.main import app  # noqa: E402
from app.services.auth_service import hash_password


def seed_test_data(db):
    user = User(
        username="test-user",
        email="test@example.com",
        password_hash=hash_password("test-password"),
    )
    chapter = Chapter(
        id=1,
        title="Test chapter",
        slug="test-chapter",
        description="Test chapter description",
        display_order=1,
        is_published=True,
    )
    lesson = Lesson(
        id=1,
        chapter_id=1,
        title="Prima lecție",
        slug="prima-lectie",
        description="Descrierea primei lecții",
        content="# Prima lecție\n\nConținut de test.",
        video_url="https://example.com/video",
        pdf_url="https://example.com/lesson.pdf",
        display_order=1,
        is_published=True,
    )
    problem = Problem(
        id=1,
        chapter_id=1,
        slug="suma-a-doua-numere",
        title="Suma a doua numere",
        subject="Sub I",
        statement="Calculeaza suma.",
        input_description="Doua numere intregi.",
        output_description="Suma numerelor.",
        constraints=[
            "-2.000.000.000 ≤ a, b ≤ 2.000.000.000"
        ],
        starter_code=(
            "#include <iostream>\n"
            "using namespace std;\n"
            "\n"
            "int main() {\n"
            "    return 0;\n"
            "}\n"
        ),
        sample_input="2 3",
        sample_output="5",
    )
    quiz = Quiz(
        id=1,
        lesson_id=1,
        title="Quiz: Prima lecție",
        is_published=True,
    )
    question = QuizQuestion(
        id=1,
        quiz_id=1,
        text="Întrebarea 1",
        display_order=1,
    )
    options = [
        QuizOption(
            id=option_id,
            question_id=1,
            text=f"Răspuns {option_id}",
            display_order=option_id,
            is_correct=option_id == 1,
        )
        for option_id in range(1, 4)
    ]
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

    db.add_all([user, chapter, lesson, problem, quiz, question, *options, *tests])
    db.commit()


@pytest.fixture
def db_session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    with SessionLocal() as db:
        seed_test_data(db)
        yield db


@pytest.fixture
def client(db_session):
    def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()

@pytest.fixture
def authenticated_client(client):
    login_response = client.post("/auth/login", json={"email": "test@example.com", "password": "test-password"})
    assert login_response.status_code == 200
    assert client.cookies.get("access_token") is not None
    return client
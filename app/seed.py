from app.database.database import SessionLocal
from app.database.schemas.chapter import Chapter
from app.database.schemas.problem import Problem
from app.database.schemas.pb_test import ProblemTest
from app.database.schemas.user import User


def seed_database():
    db = SessionLocal()

    try:
        # Dacă există deja date, nu mai facem nimic.
        if db.query(Chapter).first():
            print("Database is already seeded.")
            return

        # ======================
        # User
        # ======================

        user = User(
            username="demo",
            email="demo@test.com",
            password_hash="parola_hash"
        )

        db.add(user)
        db.flush()

        # ======================
        # Chapter
        # ======================

        chapter = Chapter(
            title="Introducere în C++",
            display_order=1
        )

        db.add(chapter)
        db.flush()

        # ======================
        # Problem
        # ======================

        problem = Problem(
            chapter_id=chapter.id,
            title="Suma a două numere",
            statement="Se citesc două numere întregi. Afișați suma lor.",
            input_description="Două numere întregi a și b.",
            output_description="Suma celor două numere.",
            sample_input="2 3",
            sample_output="5"
        )

        db.add(problem)
        db.flush()

        # ======================
        # Tests
        # ======================

        tests = [
            ProblemTest(
                problem_id=problem.id,
                input="2 3",
                expected_output="5",
                is_hidden=False
            ),
            ProblemTest(
                problem_id=problem.id,
                input="10 20",
                expected_output="30",
                is_hidden=True
            ),
            ProblemTest(
                problem_id=problem.id,
                input="-5 8",
                expected_output="3",
                is_hidden=True
            ),
            ProblemTest(
                problem_id=problem.id,
                input="100 200",
                expected_output="300",
                is_hidden = True
            ),
            ProblemTest(
                problem_id=problem.id,
                input="0 0",
                expected_output="0",
                is_hidden=True
            ),
        ]

        db.add_all(tests)

        db.commit()

        print("Database seeded successfully.")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
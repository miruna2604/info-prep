#2 utilizatori: demo si miruna
#1 capitol
#2 probleme
#testele fiecarei probleme

from app.database.database import SessionLocal
from app.database.schemas.chapter import Chapter
from app.database.schemas.problem import Problem
from app.database.schemas.pb_test import ProblemTest
from app.database.schemas.user import User


def seed_database():
    db = SessionLocal()

    try:
        # ==================================================
        # USERS
        # ==================================================

        user_demo = (
            db.query(User)
            .filter(User.email == "demo@test.com")
            .first()
        )

        if not user_demo:
            user_demo = User(
                username="demo",
                email="demo@test.com",
                password_hash="parola_hash"
            )

            db.add(user_demo)
            db.flush()

        user_miruna = (
            db.query(User)
            .filter(User.email == "miruna@test.com")
            .first()
        )

        if not user_miruna:
            user_miruna = User(
                username="miruna",
                email="miruna@test.com",
                password_hash="parola_hash"
            )

            db.add(user_miruna)
            db.flush()

        # ==================================================
        # CHAPTER
        # ==================================================

        chapter = (
            db.query(Chapter)
            .filter(Chapter.title == "Introducere în C++")
            .first()
        )

        if not chapter:
            chapter = Chapter(
                title="Introducere în C++",
                display_order=1
            )

            db.add(chapter)
            db.flush()

        # ==================================================
        # PROBLEM 1
        # ==================================================

        sum_problem = (
            db.query(Problem)
            .filter(
                Problem.chapter_id == chapter.id,
                Problem.title == "Suma a două numere"
            )
            .first()
        )

        if not sum_problem:
            sum_problem = Problem(
                chapter_id=chapter.id,
                title="Suma a două numere",
                statement="Se citesc două numere întregi. Afișați suma lor.",
                input_description="Două numere întregi a și b.",
                output_description="Suma celor două numere.",
                sample_input="2 3",
                sample_output="5"
            )

            db.add(sum_problem)
            db.flush()

            sum_tests = [
                ProblemTest(
                    problem_id=sum_problem.id,
                    input="2 3",
                    expected_output="5",
                    is_hidden=False
                ),
                ProblemTest(
                    problem_id=sum_problem.id,
                    input="10 20",
                    expected_output="30",
                    is_hidden=True
                ),
                ProblemTest(
                    problem_id=sum_problem.id,
                    input="-5 8",
                    expected_output="3",
                    is_hidden=True
                ),
                ProblemTest(
                    problem_id=sum_problem.id,
                    input="100 200",
                    expected_output="300",
                    is_hidden=True
                ),
                ProblemTest(
                    problem_id=sum_problem.id,
                    input="0 0",
                    expected_output="0",
                    is_hidden=True
                )
            ]

            db.add_all(sum_tests)

        # ==================================================
        # PROBLEM 2
        # ==================================================

        maximum_problem = (
            db.query(Problem)
            .filter(
                Problem.chapter_id == chapter.id,
                Problem.title == "Maximul dintre două numere"
            )
            .first()
        )

        if not maximum_problem:
            maximum_problem = Problem(
                chapter_id=chapter.id,
                title="Maximul dintre două numere",
                statement="Se citesc două numere întregi. Afișați numărul mai mare.",
                input_description="Două numere întregi a și b.",
                output_description="Valoarea maximă dintre a și b.",
                sample_input="4 9",
                sample_output="9"
            )

            db.add(maximum_problem)
            db.flush()

            maximum_tests = [
                ProblemTest(
                    problem_id=maximum_problem.id,
                    input="4 9",
                    expected_output="9",
                    is_hidden=False
                ),
                ProblemTest(
                    problem_id=maximum_problem.id,
                    input="20 7",
                    expected_output="20",
                    is_hidden=True
                ),
                ProblemTest(
                    problem_id=maximum_problem.id,
                    input="-3 -8",
                    expected_output="-3",
                    is_hidden=True
                ),
                ProblemTest(
                    problem_id=maximum_problem.id,
                    input="5 5",
                    expected_output="5",
                    is_hidden=True
                )
            ]

            db.add_all(maximum_tests)

        db.commit()

        print("Database seeded successfully.")
        print(f"Demo user ID: {user_demo.id}")
        print(f"Miruna user ID: {user_miruna.id}")
        print(f"Sum problem ID: {sum_problem.id}")
        print(f"Maximum problem ID: {maximum_problem.id}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()



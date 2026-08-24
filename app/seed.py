#2 utilizatori: demo si miruna
#1 capitol
#2 probleme
#testele fiecarei probleme

import json
from pathlib import Path

from app.database.database import SessionLocal
from app.database.schemas.chapter import Chapter
from app.database.schemas.lesson import Lesson
from app.database.schemas.problem import Problem
from app.database.schemas.pb_test import ProblemTest
from app.database.schemas.quiz import Quiz, QuizOption, QuizQuestion
from app.database.schemas.user import User


LESSON_CONTENT_DIRECTORY = (
    Path(__file__).resolve().parent.parent / "content" / "lessons"
)
QUIZ_CONTENT_DIRECTORY = (
    Path(__file__).resolve().parent.parent / "content" / "quizzes"
)


def load_lesson_content(chapter_slug: str, lesson_slug: str) -> str:
    lesson_path = (
        LESSON_CONTENT_DIRECTORY
        / chapter_slug
        / f"{lesson_slug}.md"
    )

    if not lesson_path.is_file():
        return ""

    return lesson_path.read_text(encoding="utf-8").strip()


def load_quiz_content(chapter_slug: str, lesson_slug: str) -> dict | None:
    quiz_path = (
        QUIZ_CONTENT_DIRECTORY
        / chapter_slug
        / f"{lesson_slug}.json"
    )

    if not quiz_path.is_file():
        return None

    quiz_data = json.loads(quiz_path.read_text(encoding="utf-8"))
    questions = quiz_data.get("questions")

    if not isinstance(questions, list) or not questions:
        raise ValueError(f"{quiz_path}: 'questions' must be a non-empty list")

    for question_index, question in enumerate(questions, start=1):
        if not isinstance(question.get("text"), str) or not question["text"].strip():
            raise ValueError(f"{quiz_path}: question {question_index} needs text")

        options = question.get("options")
        if not isinstance(options, list) or len(options) != 3:
            raise ValueError(
                f"{quiz_path}: question {question_index} must have exactly 3 options"
            )

        correct_options = 0
        for option_index, option in enumerate(options, start=1):
            if not isinstance(option.get("text"), str) or not option["text"].strip():
                raise ValueError(
                    f"{quiz_path}: option {option_index} of question "
                    f"{question_index} needs text"
                )
            if not isinstance(option.get("is_correct"), bool):
                raise ValueError(
                    f"{quiz_path}: option {option_index} of question "
                    f"{question_index} needs a boolean 'is_correct'"
                )
            correct_options += option["is_correct"]

        if correct_options != 1:
            raise ValueError(
                f"{quiz_path}: question {question_index} must have "
                "exactly one correct option"
            )

    return quiz_data


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

        chapters_data = [
            {
                "title": "Bazele programării în C++",
                "slug": "bazele-programarii-in-cpp",
                "description": "Sintaxă, variabile, operatori, citire, afișare și structuri de control.",
            },
            {
                "title": "Algoritmi elementari",
                "slug": "algoritmi-elementari",
                "description": "Prelucrări pe cifre, divizibilitate și algoritmi fundamentali.",
            },
            {
                "title": "Vectori",
                "slug": "vectori",
                "description": "Tablouri unidimensionale, parcurgeri și prelucrări uzuale.",
            },
            {
                "title": "Matrici",
                "slug": "matrici",
                "description": "Tablouri bidimensionale, linii, coloane și diagonale.",
            },
            {
                "title": "Șiruri de caractere",
                "slug": "siruri-de-caractere",
                "description": "Reprezentarea și prelucrarea textelor în C++.",
            },
            {
                "title": "Subprograme",
                "slug": "subprograme",
                "description": "Funcții, parametri și organizarea programelor în componente reutilizabile.",
            },
            {
                "title": "Recursivitate",
                "slug": "recursivitate",
                "description": "Rezolvarea problemelor prin apeluri recursive și cazuri de bază.",
            },
            {
                "title": "Backtracking",
                "slug": "backtracking",
                "description": "Generarea și explorarea sistematică a soluțiilor posibile.",
            },
            {
                "title": "Structuri de date (struct)",
                "slug": "structuri-de-date-struct",
                "description": "Gruparea datelor eterogene în tipuri definite de programator.",
            },
            {
                "title": "Fișiere text",
                "slug": "fisiere-text",
                "description": "Citirea și scrierea datelor folosind fișiere text.",
            },
            {
                "title": "Grafuri",
                "slug": "grafuri",
                "description": "Reprezentări, parcurgeri și proprietăți fundamentale ale grafurilor.",
            },
            {
                "title": "Arbori",
                "slug": "arbori",
                "description": "Structuri arborescente și algoritmi de parcurgere.",
            },
            {
                "title": "Algoritmi eficienți",
                "slug": "algoritmi-eficienti",
                "description": "Strategii de optimizare și analiza eficienței soluțiilor.",
            },
            {
                "title": "Antrenament BAC",
                "slug": "antrenament-bac",
                "description": "Exerciții recapitulative și simulări pentru examenul de Bacalaureat.",
            },
        ]

        legacy_chapter = (
            db.query(Chapter)
            .filter(
                (Chapter.slug.in_(["introducere-in-cpp", "bazele-programarii-in-cpp"]))
                | (Chapter.title.in_(["Introducere în C++", "Bazele programării în C++"]))
            )
            .first()
        )

        chapter = None

        for display_order, chapter_data in enumerate(chapters_data, start=1):
            current_chapter = legacy_chapter if display_order == 1 else (
                db.query(Chapter)
                .filter(Chapter.slug == chapter_data["slug"])
                .first()
            )

            if current_chapter is None:
                current_chapter = Chapter(
                    title=chapter_data["title"],
                    slug=chapter_data["slug"],
                    description=chapter_data["description"],
                    display_order=display_order,
                    is_published=True,
                )
                db.add(current_chapter)
                db.flush()
            else:
                current_chapter.title = chapter_data["title"]
                current_chapter.slug = chapter_data["slug"]
                current_chapter.description = chapter_data["description"]
                current_chapter.display_order = display_order
                current_chapter.is_published = True

            if display_order == 1:
                chapter = current_chapter

        if chapter is None:
            raise RuntimeError("The foundational C++ chapter could not be seeded")
        # ==================================================
        # LESSONS
        # ==================================================

        lessons_data = [
            {
                "title": "Structura unui program C++",
                "slug": "structura-unui-program-cpp",
                "description": "Descoperă componentele de bază ale unui program C++.",
                "display_order": 1,
            },
            {
                "title": "Citire și afișare",
                "slug": "citire-si-afisare",
                "description": "Folosește cin și cout pentru intrarea și ieșirea datelor.",
                "display_order": 2,
            },
            {
                "title": "Variabile și constante",
                "slug": "variabile-si-constante",
                "description": "Declară și utilizează valori care se pot modifica sau rămân constante.",
                "display_order": 3,
            },
            {
                "title": "Tipuri de date",
                "slug": "tipuri-de-date",
                "description": "Alege tipul potrivit pentru valorile folosite în program.",
                "display_order": 4,
            },
            {
                "title": "Operatori aritmetici",
                "slug": "operatori-aritmetici",
                "description": "Construiește calcule folosind operatorii aritmetici din C++.",
                "display_order": 5,
            },
            {
                "title": "Operatori relaționali și logici",
                "slug": "operatori-relationali-si-logici",
                "description": "Compară valori și combină condiții logice.",
                "display_order": 6,
            },
            {
                "title": "Expresii",
                "slug": "expresii",
                "description": "Înțelege evaluarea expresiilor și ordinea operațiilor.",
                "display_order": 7,
            },
            {
                "title": "Instrucțiunea if",
                "slug": "instructiunea-if",
                "description": "Controlează execuția programului folosind condiții.",
                "display_order": 8,
            },
            {
                "title": "Instrucțiunea switch",
                "slug": "instructiunea-switch",
                "description": "Selectează una dintre mai multe ramuri de execuție.",
                "display_order": 9,
            },
            {
                "title": "Structuri repetitive: for, while, do while",
                "slug": "structuri-repetitive-for-while-do-while",
                "description": "Repetă instrucțiuni folosind cele trei structuri iterative principale.",
                "display_order": 10,
            },
        ]

        for lesson_data in lessons_data:
            lesson_content = load_lesson_content(
                chapter.slug,
                lesson_data["slug"],
            )
            lesson = (
                db.query(Lesson)
                .filter(
                    Lesson.chapter_id == chapter.id,
                    Lesson.display_order == lesson_data["display_order"],
                )
                .first()
            )

            if not lesson:
                lesson = Lesson(
                    chapter_id=chapter.id,
                    title=lesson_data["title"],
                    slug=lesson_data["slug"],
                    description=lesson_data["description"],
                    content=lesson_content,
                    video_url=None,
                    pdf_url=None,
                    display_order=lesson_data["display_order"],
                    is_published=True,
                )

                db.add(lesson)
            else:
                lesson.title = lesson_data["title"]
                lesson.slug = lesson_data["slug"]
                lesson.description = lesson_data["description"]
                lesson.content = lesson_content
                lesson.display_order = lesson_data["display_order"]
                lesson.is_published = True

        # ==================================================
        # QUIZZES
        # ==================================================

        chapter_lessons = (
            db.query(Lesson)
            .filter(Lesson.chapter_id == chapter.id)
            .order_by(Lesson.display_order)
            .all()
        )

        for lesson in chapter_lessons:
            quiz_data = load_quiz_content(chapter.slug, lesson.slug)
            quiz = db.query(Quiz).filter(Quiz.lesson_id == lesson.id).first()

            if quiz_data is None:
                if quiz is not None:
                    quiz.is_published = False
                continue

            if quiz is None:
                quiz = Quiz(
                    lesson_id=lesson.id,
                    title=quiz_data.get("title") or f"Quiz: {lesson.title}",
                    is_published=True,
                )
                db.add(quiz)
                db.flush()
            else:
                quiz.title = quiz_data.get("title") or f"Quiz: {lesson.title}"
                quiz.is_published = True

            for question_order, question_data in enumerate(
                quiz_data["questions"],
                start=1,
            ):
                question = (
                    db.query(QuizQuestion)
                    .filter(
                        QuizQuestion.quiz_id == quiz.id,
                        QuizQuestion.display_order == question_order,
                    )
                    .first()
                )

                if question is None:
                    question = QuizQuestion(
                        quiz_id=quiz.id,
                        text=question_data["text"],
                        display_order=question_order,
                    )
                    db.add(question)
                    db.flush()
                else:
                    question.text = question_data["text"]

                for option_order, option_data in enumerate(
                    question_data["options"],
                    start=1,
                ):
                    option = (
                        db.query(QuizOption)
                        .filter(
                            QuizOption.question_id == question.id,
                            QuizOption.display_order == option_order,
                        )
                        .first()
                    )

                    if option is None:
                        option = QuizOption(
                            question_id=question.id,
                            text=option_data["text"],
                            display_order=option_order,
                            is_correct=option_data["is_correct"],
                        )
                        db.add(option)
                    else:
                        option.text = option_data["text"]
                        option.is_correct = option_data["is_correct"]

            stale_questions = (
                db.query(QuizQuestion)
                .filter(
                    QuizQuestion.quiz_id == quiz.id,
                    QuizQuestion.display_order > len(quiz_data["questions"]),
                )
                .all()
            )
            for stale_question in stale_questions:
                db.delete(stale_question)
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

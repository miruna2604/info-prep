#2 utilizatori: demo si miruna
#1 capitol
#2 probleme
#testele fiecarei probleme

# Vreau și baza de teste
#  docker compose stop test_database
#docker compose start test_database

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

        source = question.get("source")
        if source is not None and (not isinstance(source, str) or not source.strip()):
            raise ValueError(f"{quiz_path}: question {question_index} needs a non-empty source")

        options = question.get("options")
        if not isinstance(options, list) or len(options) not in (3, 4):
            raise ValueError(
                f"{quiz_path}: question {question_index} must have 3 or 4 options"
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
                "title": "Subprograme",
                "slug": "subprograme",
                "description": "Funcții, parametri și organizarea programelor în componente reutilizabile.",
            },
            {
                "title": "Șiruri de caractere",
                "slug": "siruri-de-caractere",
                "description": "Reprezentarea și prelucrarea textelor în C++.",
            },
            {
                "title": "Structuri de date (struct)",
                "slug": "structuri-de-date-struct",
                "description": "Gruparea datelor eterogene în tipuri definite de programator.",
            },
            {
                "title": "Backtracking",
                "slug": "backtracking",
                "description": "Generarea și explorarea sistematică a soluțiilor posibile.",
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
                "title": "Fișiere text",
                "slug": "fisiere-text",
                "description": "Citirea și scrierea datelor folosind fișiere text.",
            },
            {
                "title": "Recursivitate",
                "slug": "recursivitate",
                "description": "Rezolvarea problemelor prin apeluri recursive și cazuri de bază.",
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

        elementary_algorithms_chapter = (
            db.query(Chapter)
            .filter(Chapter.slug == "algoritmi-elementari")
            .first()
        )

        if elementary_algorithms_chapter is None:
            raise RuntimeError("The elementary algorithms chapter could not be seeded")
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
                "display_order": 4,
            },
            {
                "title": "Variabile și constante",
                "slug": "variabile-si-constante",
                "description": "Declară și utilizează valori care se pot modifica sau rămân constante.",
                "display_order": 2,
            },
            {
                "title": "Tipuri de date",
                "slug": "tipuri-de-date",
                "description": "Alege tipul potrivit pentru valorile folosite în program.",
                "display_order": 3,
            },
            {
                "title": "Operatori aritmetici",
                "slug": "operatori-aritmetici",
                "description": "Construiește calcule folosind operatorii aritmetici din C++.",
                "display_order": 5,
            },
            {
                "title": "Operatori relaționali",
                "slug": "operatori-relationali",
                "description": "Compară valori folosind operatorii <, >, <=, >=, == și !=.",
                "display_order": 6,
            },
            {
                "title": "Operatori logici",
                "slug": "operatori-logici",
                "description": "Combină și neagă condiții folosind operatorii &&, || și !.",
                "display_order": 7,
            },
            {
                "title": "Expresii",
                "slug": "expresii",
                "description": "Înțelege evaluarea expresiilor și ordinea operațiilor.",
                "display_order": 8,
            },
            {
                "title": "Instrucțiunea if",
                "slug": "instructiunea-if",
                "description": "Controlează execuția programului folosind condiții.",
                "display_order": 9,
            },
            {
                "title": "Instrucțiunea switch",
                "slug": "instructiunea-switch",
                "description": "Selectează una dintre mai multe ramuri de execuție.",
                "display_order": 10,
            },
            {
                "title": "Instrucțiunea for",
                "slug": "instructiunea-for",
                "description": "Repetă instrucțiuni folosind inițializarea, condiția și actualizarea din for.",
                "display_order": 11,
            },
            {
                "title": "Instrucțiunea while",
                "slug": "instructiunea-while",
                "description": "Repetă instrucțiuni cât timp condiția verificată la început este adevărată.",
                "display_order": 12,
            },
            {
                "title": "Instrucțiunea do while",
                "slug": "instructiunea-do-while",
                "description": "Execută instrucțiunile cel puțin o dată și verifică apoi condiția de repetare.",
                "display_order": 13,
            },
        ]

        # Retire grouped lessons without deleting their content or relationships.
        # Matching by slug below preserves lesson IDs when display order changes.
        legacy_lessons = db.query(Lesson).filter(
            Lesson.chapter_id == chapter.id,
            Lesson.slug.in_([
                "operatori-relationali-si-logici",
                "structuri-repetitive-for-while-do-while",
            ]),
        ).all()
        for legacy_lesson in legacy_lessons:
            legacy_lesson.is_published = False
            if legacy_lesson.quiz is not None:
                legacy_lesson.quiz.is_published = False

        for lesson_data in lessons_data:
            lesson_content = load_lesson_content(
                chapter.slug,
                lesson_data["slug"],
            )
            lesson = (
                db.query(Lesson)
                .filter(
                    Lesson.chapter_id == chapter.id,
                    Lesson.slug == lesson_data["slug"],
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

        elementary_lessons_data = [
            {
                "title": "Suma cifrelor",
                "slug": "suma-cifrelor",
                "description": "Calculează suma cifrelor unui număr și urmărește algoritmul pas cu pas.",
                "display_order": 1,
            },
            {
                "title": "Numărul de cifre",
                "slug": "numarul-de-cifre",
                "description": "Numără cifrele unui număr urmărind pas cu pas împărțirile la 10.",
                "display_order": 2,
            },
            {
                "title": "Numărul de apariții ale unei cifre",
                "slug": "numarul-de-aparitii-ale-unei-cifre",
                "description": "Află de câte ori apare o cifră într-un număr, comparând cifrele pe rând.",
                "display_order": 3,
            },
            {
                "title": "Răsturnatul unui număr",
                "slug": "rasturnatul-unui-numar",
                "description": "Construiește inversul unui număr mutând cifrele de la dreapta la stânga.",
                "display_order": 4,
            },
            {
                "title": "Număr palindrom",
                "slug": "numar-palindrom",
                "description": "Verifică dacă un număr este egal cu răsturnatul său.",
                "display_order": 5,
            },
            {
                "title": "Eliminarea cifrelor pare",
                "slug": "eliminarea-cifrelor-pare",
                "description": "Păstrează cifrele impare și reconstruiește numărul în ordinea corectă.",
                "display_order": 6,
            },
            {"title": "Divizorii unui număr", "slug": "divizorii-unui-numar", "description": "Înțelege divizorii, divizorii proprii și metoda eficientă până la radical.", "display_order": 7},
            {"title": "Numărul divizorilor", "slug": "numarul-divizorilor", "description": "Numără valorile care îl divid exact pe n.", "display_order": 8},
            {"title": "Suma divizorilor", "slug": "suma-divizorilor", "description": "Adună toți divizorii unui număr natural.", "display_order": 9},
            {"title": "Verificarea unui număr prim", "slug": "verificarea-unui-numar-prim", "description": "Caută un divizor propriu pentru a decide dacă n este prim.", "display_order": 10},
            {"title": "Numere prime dintr-un interval", "slug": "numere-prime-dintr-un-interval", "description": "Verifică pe rând numerele din intervalul [a, b].", "display_order": 11},
            {"title": "Descompunerea în factori primi", "slug": "descompunerea-in-factori-primi", "description": "Împarte repetat numărul la fiecare factor și determină puterile.", "display_order": 12},
            {"title": "CMMDC", "slug": "cmmdc-algoritmul-lui-euclid", "description": "Compară algoritmul lui Euclid cu împărțiri și varianta sa bazată pe scăderi.", "display_order": 13},
            {"title": "CMMMC", "slug": "cmmmc", "description": "Calculează CMMMC folosind CMMDC și valorile inițiale.", "display_order": 14},
            {"title": "Numere prime între ele", "slug": "numere-prime-intre-ele", "description": "Verifică dacă două numere au CMMDC egal cu 1.", "display_order": 15},
            {"title": "Minimul și maximul unui vector", "slug": "minimul-si-maximul-unui-vector", "description": "Urmărește cum se actualizează minimul și maximul la o singură parcurgere.", "display_order": 16},
            {"title": "Cele mai mari două valori distincte", "slug": "cele-mai-mari-doua-valori-distincte", "description": "Păstrează ordonat primele două valori maxime distincte.", "display_order": 17},
            {"title": "Cele mai mici două valori distincte", "slug": "cele-mai-mici-doua-valori-distincte", "description": "Păstrează ordonat primele două valori minime distincte.", "display_order": 18},
            {"title": "Cele mai mari trei valori distincte", "slug": "cele-mai-mari-trei-valori-distincte", "description": "Actualizează și deplasează cele mai mari trei valori distincte.", "display_order": 19},
            {"title": "Cele mai mici trei valori distincte", "slug": "cele-mai-mici-trei-valori-distincte", "description": "Actualizează și deplasează cele mai mici trei valori distincte.", "display_order": 20},
            {"title": "Vector de frecvență – numărul de apariții", "slug": "vector-frecventa-numarul-aparitiilor", "description": "Construiește f[x] numărând fiecare apariție a valorii x.", "display_order": 21},
            {"title": "Vector de apariții – există sau nu există", "slug": "vector-aparitii-exista-sau-nu", "description": "Memorează prin 0 și 1 dacă fiecare valoare a apărut în date.", "display_order": 22},
            {"title": "Cea mai lungă secvență de numere pozitive", "slug": "cea-mai-lunga-secventa-pozitiva", "description": "Urmărește secvența pozitivă curentă și recordul maxim.", "display_order": 23},
            {"title": "Cea mai lungă secvență de numere egale", "slug": "cea-mai-lunga-secventa-de-numere-egale", "description": "Compară fiecare element cu anteriorul și măsoară grupurile egale.", "display_order": 24},
            {"title": "Cea mai lungă secvență strict crescătoare", "slug": "cea-mai-lunga-secventa-strict-crescatoare", "description": "Măsoară cea mai lungă porțiune consecutivă strict crescătoare.", "display_order": 25},
            {"title": "Bubble Sort", "slug": "bubble-sort", "description": "Sortează prin comparații între vecini și urmărește elementele care ajung la final.", "display_order": 26},
            {"title": "Selection Sort", "slug": "selection-sort", "description": "Caută minimul din zona nesortată și îl așază pe poziția corectă.", "display_order": 27},
            {"title": "Insertion Sort", "slug": "insertion-sort", "description": "Inserează fiecare element în poziția potrivită din partea deja sortată.", "display_order": 28},
            {"title": "Căutare binară", "slug": "cautare-binara", "description": "Găsește o valoare eliminând la fiecare pas jumătate din zona de căutare.", "display_order": 29},
            {"title": "Interclasarea a doi vectori sortați", "slug": "interclasarea-a-doi-vectori-sortati", "description": "Construiește un singur vector sortat folosind doi pointeri de citire.", "display_order": 30},
        ]

        for lesson_data in elementary_lessons_data:
            lesson_content = load_lesson_content(
                elementary_algorithms_chapter.slug,
                lesson_data["slug"],
            )
            lesson = (
                db.query(Lesson)
                .filter(
                    Lesson.chapter_id == elementary_algorithms_chapter.id,
                    Lesson.slug == lesson_data["slug"],
                )
                .first()
            )

            if lesson is None:
                lesson = Lesson(
                    chapter_id=elementary_algorithms_chapter.id,
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

            if not lesson.is_published or quiz_data is None:
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
                        source=question_data.get("source"),
                        display_order=question_order,
                    )
                    db.add(question)
                    db.flush()
                else:
                    question.text = question_data["text"]
                    question.source = question_data.get("source")

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

                db.query(QuizOption).filter(
                    QuizOption.question_id == question.id,
                    QuizOption.display_order > len(question_data["options"]),
                ).delete(synchronize_session=False)

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

        sum_problem_data = {
            "chapter_id": chapter.id,
            "slug": "suma-a-doua-numere",
            "title": "Suma a două numere",
            "subject": "Sub I",
            "statement": "Se citesc două numere întregi. Afișați suma lor.",
            "input_description": "Două numere întregi a și b.",
            "output_description": "Suma celor două numere.",
            "constraints": [
                "-2.000.000.000 ≤ a, b ≤ 2.000.000.000"
            ],
            "starter_code": (
                "#include <iostream>\n"
                "using namespace std;\n"
                "\n"
                "int main() {\n"
                "    long long a, b;\n"
                "    cin >> a >> b;\n"
                "\n"
                "    // Scrie soluția aici\n"
                "\n"
                "    return 0;\n"
                "}\n"
            ),
            "sample_input": "2 3",
            "sample_output": "5",
        }

        sum_problem = (
            db.query(Problem)
            .filter(Problem.slug == "suma-a-doua-numere")
            .first()
        )

        if sum_problem is None:
            sum_problem = Problem(**sum_problem_data)
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
        else:
            for field, value in sum_problem_data.items():
                setattr(sum_problem, field, value)


        # ==================================================
        # PROBLEM 2
        # ==================================================

        maximum_problem_data = {
            "chapter_id": chapter.id,
            "slug": "maximul-dintre-doua-numere",
            "title": "Maximul dintre două numere",
            "subject": "Sub I",
            "statement": "Se citesc două numere întregi. Afișați numărul mai mare.",
            "input_description": "Două numere întregi a și b.",
            "output_description": "Valoarea maximă dintre a și b.",
            "constraints": [
                "-2.000.000.000 ≤ a, b ≤ 2.000.000.000"
            ],
            "starter_code": (
                "#include <iostream>\n"
                "using namespace std;\n"
                "\n"
                "int main() {\n"
                "    long long a, b;\n"
                "    cin >> a >> b;\n"
                "\n"
                "    // Scrie soluția aici\n"
                "\n"
                "    return 0;\n"
                "}\n"
            ),
            "sample_input": "4 9",
            "sample_output": "9",
        }

        maximum_problem = (
            db.query(Problem)
            .filter(Problem.slug == "maximul-dintre-doua-numere")
            .first()
        )

        if maximum_problem is None:
            maximum_problem = Problem(**maximum_problem_data)
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
        else:
            for field, value in maximum_problem_data.items():
                setattr(maximum_problem, field, value)

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

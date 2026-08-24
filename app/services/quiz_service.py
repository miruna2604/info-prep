from fastapi import HTTPException
from sqlalchemy.orm import Session, selectinload

from app.database.schemas.chapter import Chapter
from app.database.schemas.lesson import Lesson
from app.database.schemas.quiz import Quiz, QuizQuestion
from app.models.quizzes import (
    QuizOptionResponse,
    QuizQuestionResponse,
    QuizQuestionResult,
    QuizResponse,
    QuizResult,
    QuizSubmission,
    QuizSummary,
)


def get_chapter_quizzes(db: Session, chapter_slug: str) -> list[QuizSummary]:
    chapter = (
        db.query(Chapter)
        .filter(
            Chapter.slug == chapter_slug,
            Chapter.is_published.is_(True),
        )
        .first()
    )
    if chapter is None:
        raise HTTPException(status_code=404, detail="Chapter not found")

    quizzes = (
        db.query(Quiz)
        .join(Lesson)
        .options(selectinload(Quiz.questions))
        .filter(
            Lesson.chapter_id == chapter.id,
            Lesson.is_published.is_(True),
            Quiz.is_published.is_(True),
        )
        .order_by(Lesson.display_order)
        .all()
    )

    return [
        QuizSummary(
            title=quiz.title,
            lesson_title=quiz.lesson.title,
            lesson_slug=quiz.lesson.slug,
            question_count=len(quiz.questions),
        )
        for quiz in quizzes
    ]


def _get_quiz(db: Session, chapter_slug: str, lesson_slug: str) -> Quiz:
    quiz = (
        db.query(Quiz)
        .join(Lesson)
        .join(Chapter)
        .options(
            selectinload(Quiz.questions).selectinload(QuizQuestion.options),
            selectinload(Quiz.lesson).selectinload(Lesson.chapter),
        )
        .filter(
            Chapter.slug == chapter_slug,
            Chapter.is_published.is_(True),
            Lesson.slug == lesson_slug,
            Lesson.is_published.is_(True),
            Quiz.is_published.is_(True),
        )
        .first()
    )
    if quiz is None:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz


def get_quiz(db: Session, chapter_slug: str, lesson_slug: str) -> QuizResponse:
    quiz = _get_quiz(db, chapter_slug, lesson_slug)

    return QuizResponse(
        title=quiz.title,
        chapter_title=quiz.lesson.chapter.title,
        chapter_slug=quiz.lesson.chapter.slug,
        lesson_title=quiz.lesson.title,
        lesson_slug=quiz.lesson.slug,
        questions=[
            QuizQuestionResponse(
                id=question.id,
                text=question.text,
                display_order=question.display_order,
                options=[
                    QuizOptionResponse(
                        id=option.id,
                        text=option.text,
                        display_order=option.display_order,
                    )
                    for option in question.options
                ],
            )
            for question in quiz.questions
        ],
    )


def submit_quiz(
    db: Session,
    chapter_slug: str,
    lesson_slug: str,
    submission: QuizSubmission,
) -> QuizResult:
    quiz = _get_quiz(db, chapter_slug, lesson_slug)
    selected_options = {
        answer.question_id: answer.option_id
        for answer in submission.answers
    }
    question_ids = {question.id for question in quiz.questions}

    if not set(selected_options).issubset(question_ids):
        raise HTTPException(status_code=422, detail="Invalid quiz question")

    results: list[QuizQuestionResult] = []

    for question in quiz.questions:
        selected_option_id = selected_options.get(question.id)
        option_ids = {option.id for option in question.options}

        if selected_option_id is not None and selected_option_id not in option_ids:
            raise HTTPException(status_code=422, detail="Invalid quiz option")

        correct_option = next(
            (option for option in question.options if option.is_correct),
            None,
        )
        if correct_option is None:
            raise HTTPException(status_code=500, detail="Quiz is configured incorrectly")

        results.append(
            QuizQuestionResult(
                question_id=question.id,
                selected_option_id=selected_option_id,
                correct_option_id=correct_option.id,
                is_correct=selected_option_id == correct_option.id,
            )
        )

    return QuizResult(
        correct_answers=sum(result.is_correct for result in results),
        total_questions=len(results),
        questions=results,
    )

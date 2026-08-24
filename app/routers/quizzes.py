from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.quizzes import QuizResponse, QuizResult, QuizSubmission, QuizSummary
from app.services import quiz_service


router = APIRouter(prefix="/quizzes", tags=["Quizzes"])


@router.get("/chapters/{chapter_slug}", response_model=list[QuizSummary])
def get_chapter_quizzes(
    chapter_slug: str,
    db: Session = Depends(get_db),
):
    return quiz_service.get_chapter_quizzes(db, chapter_slug)


@router.get(
    "/chapters/{chapter_slug}/lessons/{lesson_slug}",
    response_model=QuizResponse,
)
def get_quiz(
    chapter_slug: str,
    lesson_slug: str,
    db: Session = Depends(get_db),
):
    return quiz_service.get_quiz(db, chapter_slug, lesson_slug)


@router.post(
    "/chapters/{chapter_slug}/lessons/{lesson_slug}/submit",
    response_model=QuizResult,
)
def submit_quiz(
    chapter_slug: str,
    lesson_slug: str,
    submission: QuizSubmission,
    db: Session = Depends(get_db),
):
    return quiz_service.submit_quiz(db, chapter_slug, lesson_slug, submission)

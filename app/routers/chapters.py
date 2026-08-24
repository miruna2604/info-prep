from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services import chapter_service, lesson_service

router = APIRouter(
    prefix="/chapters",
    tags=["Chapters"]
)

@router.get("/")
def get_all_chapters(db: Session = Depends(get_db)):
    return chapter_service.get_all_chapters(db)

@router.get("/{chapter_slug}")
def get_chapter(chapter_slug: str, db: Session = Depends(get_db)):
    return chapter_service.get_chapter_by_slug(db, chapter_slug)

@router.get("/{chapter_slug}/problems")
def get_problems_for_chapter(chapter_slug: str, db: Session = Depends(get_db)):
    return chapter_service.get_problems_for_chapter(db, chapter_slug)

@router.get("/{chapter_slug}/lessons")
def get_lessons_for_chapter(chapter_slug: str, db: Session = Depends(get_db)):
    return chapter_service.get_lessons_for_chapter(db, chapter_slug)

@router.get("/{chapter_slug}/lessons/{lesson_slug}")
def get_lesson_for_chapter(
    chapter_slug: str,
    lesson_slug: str,
    db: Session = Depends(get_db),
):
    return lesson_service.get_lesson_by_slugs(db, chapter_slug, lesson_slug)

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.database.schemas.chapter import Chapter
from app.database.schemas.lesson import Lesson

def get_lesson_by_id(db: Session, lesson_id: int) -> Lesson:
    lesson = (
        db.query(Lesson)
        .filter(
            Lesson.id == lesson_id,
            Lesson.is_published.is_(True),
        )
        .first()
    )
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

def get_lesson_by_slugs(
    db: Session,
    chapter_slug: str,
    lesson_slug: str,
) -> Lesson:
    lesson = (
        db.query(Lesson)
        .join(Chapter)
        .filter(
            Chapter.slug == chapter_slug,
            Chapter.is_published.is_(True),
            Lesson.slug == lesson_slug,
            Lesson.is_published.is_(True),
        )
        .first()
    )
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.database.schemas.lesson import Lesson

from app.database.schemas.chapter import Chapter
from app.database.schemas.problem import Problem

def get_all_chapters(db: Session) -> list[Chapter]:
    chapters = (
        db.query(Chapter)
        .filter(Chapter.is_published.is_(True))
        .order_by(Chapter.display_order)
        .all()
    )
    return chapters

def get_chapter_by_slug(db: Session, chapter_slug: str) -> Chapter:
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
    return chapter

def get_problems_for_chapter(db: Session, chapter_slug: str) -> list[Problem]:
    chapter = get_chapter_by_slug(db, chapter_slug)
    return db.query(Problem).filter(Problem.chapter_id == chapter.id).all()

def get_lessons_for_chapter(db: Session, chapter_slug: str) -> list[Lesson]:
    chapter = get_chapter_by_slug(db, chapter_slug)
    return (
        db.query(Lesson)
        .filter(
            Lesson.chapter_id == chapter.id,
            Lesson.is_published.is_(True),
        )
        .order_by(Lesson.display_order)
        .all()
    )

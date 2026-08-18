from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.database.schemas.lesson import Lesson

from app.database.schemas.chapter import Chapter
from app.database.schemas.problem import Problem

def get_all_chapters(db: Session) -> list[Chapter]:
    chapters = (db.query(Chapter).order_by(Chapter.display_order).all())
    return chapters

def get_chapter_by_id(db: Session, chapter_id: int) -> Chapter:
    chapter = db.get(Chapter, chapter_id)
    if chapter is None:
        raise HTTPException(status_code=404, detail="Chapter not found")
    return chapter

def get_problems_for_chapter(db: Session, chapter_id: int) -> list[Problem]:
    chapter = db.get(Chapter, chapter_id)
    if chapter is None:
        raise HTTPException(status=404, detail="Chapter not found")
    return (db.query(Problem).filter(Problem.chapter_id == chapter_id).all())

def get_lessons_for_chapter(db: Session, chapter_id: int) -> list[Lesson]:
    chapter = db.get(Chapter, chapter_id)
    if chapter is None:
        raise HTTPException(status_code=404, detail="Chapter not found")
    return (db.query(Lesson).filter(Lesson.chapter_id == chapter_id).order_by(Lesson.display_order).all())
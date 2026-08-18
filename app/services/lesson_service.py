from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.database.schemas.lesson import Lesson

def get_lesson_by_id(db: Session, lesson_id: int) -> Lesson:
    lesson = db.get(Lesson, lesson_id)
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson
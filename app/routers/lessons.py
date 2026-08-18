from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services import lesson_service

router = APIRouter(
    prefix="/lessons",
    tags=["Lessons"]
)

@router.get("/{lesson_id}")
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    return lesson_service.get_lesson_by_id(db, lesson_id)
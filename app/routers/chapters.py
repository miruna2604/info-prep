from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services import chapter_service

router = APIRouter(
    prefix="/chapters",
    tags=["Chapters"]
)

@router.get("/")
def get_all_chapters(db: Session = Depends(get_db)):
    return chapter_service.get_all_chapters(db)

@router.get("/{chapter_id}")
def get_chapter(chapter_id: int, db: Session = Depends(get_db)):
    return chapter_service.get_chapter_by_id(db, chapter_id)

@router.get("/{chapter_id}/problems")
def get_problems_for_chapter(chapter_id: int, db: Session = Depends(get_db)):
    return chapter_service.get_problems_for_chapter(db, chapter_id)

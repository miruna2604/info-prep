from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services import problem_service

router = APIRouter(
    prefix="/problems",
    tags=["Problems"]
)

@router.get("/{problem_id}")
def get_problem(problem_id: int, db: Session = Depends(get_db)):
    return problem_service.get_problem(db, problem_id)

@router.get("/")
def get_all_problems(db: Session = Depends(get_db)):
    return problem_service.get_all_problems(db)




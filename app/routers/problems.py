from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services import problem_service
from app.models.problems import (ProblemDetailResponse, ProblemSummaryResponse)

router = APIRouter(
    prefix="/problems",
    tags=["Problems"]
)

@router.get("/{problem_slug}", response_model=ProblemDetailResponse)
def get_problem(problem_slug: str, db: Session = Depends(get_db)):
    return problem_service.get_problem_by_slug(db, problem_slug)

@router.get("/", response_model=list[ProblemSummaryResponse])
def get_all_problems(db: Session = Depends(get_db)):
    return problem_service.get_all_problems(db)




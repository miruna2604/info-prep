from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.schemas.user import User
from app.dependencies.auth import get_current_user
from app.models.submissions import (
    RunRequest,
    RunResponse,
    SubmissionRequest,
    SubmissionResponse,
)
from app.services import submission_service

router = APIRouter(
    prefix="/submission",
    tags=["UserSubmission"]
)

@router.post("/run", response_model=RunResponse)
def run_code(run_request: RunRequest):
    return submission_service.run_code(run_request)

@router.post("/problems/{problem_id}/submit", response_model=SubmissionResponse)
def submit_solution(
    problem_id: int,
    submission: SubmissionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> SubmissionResponse:
    return submission_service.submit_solution(
        db=db,
        problem_id=problem_id,
        user_id=current_user.id,
        submission=submission,
    )

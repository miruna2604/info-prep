from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.submissions import (RunRequest, RunResponse, SubmissionRequest)
from app.services import submission_service

router = APIRouter(
    prefix="/submission",
    tags=["UserSubmission"]
)

@router.post("/run", response_model=RunResponse)
def run_code(run_request: RunRequest):
    return submission_service.run_code(run_request)

@router.post("/problems/{problem_id}/submit")
def submit_solution(problem_id: int, submission: SubmissionRequest, db: Session = Depends(get_db)):
    return submission_service.submit_solution(db, problem_id, submission)
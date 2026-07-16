from fastapi import APIRouter, HTTPException
from app.models.submissions import SubmissionRequest, SubmissionResponse
from app.services.judge0_service import execute_submission

router = APIRouter(
    prefix="/submission",
    tags=["Submission"]
)

@router.post("/", response_model=SubmissionResponse)
def create_submission(submission: SubmissionRequest):
    return execute_submission(submission)
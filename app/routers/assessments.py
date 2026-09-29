from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.schemas.user import User
from app.dependencies.auth import get_current_user
from app.models.assessments import (
    AssessmentAnswerInput,
    AssessmentAnswerResponse,
    AssessmentAttemptResponse,
    AssessmentResponse,
    AssessmentQuestionResponse,
    AssessmentResultResponse,
)
from app.services import assessment_service


router = APIRouter(prefix="/assessments", tags=["assessments"])


def public_attempt(attempt):
    response = AssessmentAttemptResponse.model_validate(attempt)
    response.questions = [AssessmentQuestionResponse.model_validate(question) for question in attempt.question_snapshot or []]
    return response


@router.get("/initial", response_model=AssessmentResponse)
def get_initial_assessment(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> AssessmentResponse:
    assessment = assessment_service.get_initial_assessment(db)
    response = AssessmentResponse.model_validate(assessment)
    response.questions = [AssessmentQuestionResponse.model_validate(q) for q in assessment.questions if q.is_active]
    return response


@router.post("/initial/attempts", response_model=AssessmentAttemptResponse)
def start_initial_attempt(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> AssessmentAttemptResponse:
    return public_attempt(
        assessment_service.start_initial_attempt(db, current_user)
    )


@router.put("/attempts/{attempt_id}/answers/{question_id}", response_model=AssessmentAnswerResponse)
def save_answer(
    attempt_id: int,
    question_id: int,
    answer: AssessmentAnswerInput,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> AssessmentAnswerResponse:
    return AssessmentAnswerResponse.model_validate(
        assessment_service.save_answer(db, attempt_id, question_id, current_user.id, answer)
    )


@router.post("/attempts/{attempt_id}/submit", response_model=AssessmentAttemptResponse)
def submit_attempt(
    attempt_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> AssessmentAttemptResponse:
    return public_attempt(
        assessment_service.submit_attempt(db, attempt_id, current_user.id)
    )


@router.get("/initial/result", response_model=AssessmentResultResponse)
def get_latest_result(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return assessment_service.get_result(db, current_user.id)


@router.get("/attempts/{attempt_id}/result", response_model=AssessmentResultResponse)
def get_attempt_result(attempt_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return assessment_service.get_result(db, current_user.id, attempt_id)

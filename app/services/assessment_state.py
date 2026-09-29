"""Initial-assessment authority shared by onboarding and assessment endpoints."""
from pydantic import ValidationError
from sqlalchemy.orm import selectinload

from app.database.schemas.assessment import Assessment, AssessmentAttempt
from app.models.assessments import AssessmentResultResponse


def initial_attempts(db, user_id):
    return db.query(AssessmentAttempt).join(Assessment).options(
        selectinload(AssessmentAttempt.answers)
    ).filter(AssessmentAttempt.user_id == user_id, Assessment.slug == 'initial').order_by(
        AssessmentAttempt.id.asc()
    ).all()


def valid_snapshot(attempt):
    return bool(attempt.question_snapshot) and all(
        question.get('grading_config') for question in attempt.question_snapshot
    )


def has_diagnostic_result(attempt):
    if attempt.status != 'SUBMITTED' or not valid_snapshot(attempt) or not attempt.result:
        return False
    try:
        result = AssessmentResultResponse.model_validate({**attempt.result, 'plan': None})
    except (ValidationError, TypeError):
        return False
    question_ids = {question['id'] for question in attempt.question_snapshot}
    evaluated_ids = {answer.question_id for answer in attempt.answers if answer.evaluation}
    return (result.attempt_id == attempt.id
            and question_ids == {item.question_id for item in result.items}
            and question_ids <= evaluated_ids)


def completed_initial_attempt(db, user_id):
    # The first modern completed attempt is the baseline, never a later restart.
    return next((attempt for attempt in initial_attempts(db, user_id)
                 if has_diagnostic_result(attempt)), None)


def active_initial_attempt(db, user_id):
    return next((attempt for attempt in initial_attempts(db, user_id)
                 if attempt.status == 'IN_PROGRESS' and valid_snapshot(attempt)), None)


def initial_status(db, user_id, profile):
    if completed_initial_attempt(db, user_id):
        return 'COMPLETED'
    if active_initial_attempt(db, user_id):
        return 'IN_PROGRESS'
    # Placeholder completion is not diagnostic evidence. Preserve its records,
    # but allow a new modern assessment instead of fabricating a result.
    return profile.assessment_status if profile and profile.assessment_status in ('NOT_STARTED', 'DEFERRED') else 'NOT_STARTED'

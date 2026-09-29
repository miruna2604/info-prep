from copy import deepcopy
from datetime import datetime, timezone
from decimal import Decimal, ROUND_HALF_UP

from fastapi import HTTPException
from sqlalchemy.orm import Session, selectinload

from app.database.schemas.assessment import (
    Assessment, AssessmentAnswer, AssessmentAttempt, AssessmentQuestion, AssessmentConcept, PersonalizedPlan,
)
from app.database.schemas.user import User
from app.models.assessments import AssessmentAnswerInput
from app.models.onboarding import AssessmentStatus
from app.services.onboarding_service import get_user_profile
from app.services.assessment_grading import grade_answer
from app.services.assessment_planning import build_evidence, create_plan
from app.services.assessment_state import completed_initial_attempt, active_initial_attempt, has_diagnostic_result


def get_initial_assessment(db: Session) -> Assessment:
    assessment = db.query(Assessment).options(selectinload(Assessment.questions)).filter(
        Assessment.slug == 'initial', Assessment.is_published.is_(True)
    ).one_or_none()
    if assessment is None:
        raise HTTPException(404, 'Evaluarea inițială nu este disponibilă.')
    return assessment


def snapshot_questions(assessment):
    return [deepcopy({field: getattr(question, field) for field in (
        'id', 'display_order', 'prompt', 'answer_type', 'question_config', 'concept_refs',
        'grading_config', 'points', 'allow_not_learned',
    )}) for question in assessment.questions if question.is_active]


def start_initial_attempt(db: Session, user: User) -> AssessmentAttempt:
    # Serialize starts for the same user (including multiple browser tabs).
    db.query(User).filter(User.id == user.id).with_for_update().one()
    profile = get_user_profile(db, user.id)
    if profile is None or not profile.onboarding_completed:
        raise HTTPException(409, 'Completează mai întâi onboarding-ul.')
    completed = completed_initial_attempt(db, user.id)
    if completed:
        profile.assessment_status = AssessmentStatus.COMPLETED.value
        db.commit()
        return completed
    attempt = active_initial_attempt(db, user.id)
    if attempt is None:
        assessment = get_initial_assessment(db)
        questions = snapshot_questions(assessment)
        if not questions or any(not q['grading_config'] for q in questions):
            raise HTTPException(409, 'Evaluarea nu este încă pregătită. Rulează seed-ul evaluării.')
        attempt = AssessmentAttempt(assessment_id=assessment.id, user_id=user.id,
                                    question_snapshot=questions)
        db.add(attempt)
    profile.assessment_status = AssessmentStatus.IN_PROGRESS.value
    db.commit()
    db.refresh(attempt)
    return attempt


def get_owned_attempt(db: Session, attempt_id: int, user_id: int, lock=False) -> AssessmentAttempt:
    query = db.query(AssessmentAttempt).options(selectinload(AssessmentAttempt.answers)).filter(
        AssessmentAttempt.id == attempt_id, AssessmentAttempt.user_id == user_id,
    )
    if lock:
        query = query.with_for_update()
    attempt = query.one_or_none()
    if attempt is None:
        raise HTTPException(404, 'Evaluarea nu a fost găsită.')
    return attempt


def save_answer(db: Session, attempt_id: int, question_id: int, user_id: int,
                answer_input: AssessmentAnswerInput) -> AssessmentAnswer:
    db.query(User).filter(User.id == user_id).with_for_update().one()
    attempt = get_owned_attempt(db, attempt_id, user_id, lock=True)
    if attempt.status != 'IN_PROGRESS' or completed_initial_attempt(db, user_id):
        raise HTTPException(409, 'Evaluarea a fost deja trimisă.')
    question = next((q for q in attempt.question_snapshot or [] if q['id'] == question_id), None)
    if question is None:
        raise HTTPException(404, 'Întrebarea nu există în această evaluare.')
    state = answer_input.state.value
    if state == 'not_learned' and not question['allow_not_learned']:
        raise HTTPException(422, 'Această întrebare nu permite opțiunea selectată.')
    data = None
    if state == 'answered':
        text = (answer_input.answer_data or {}).get('text')
        if not isinstance(text, str) or not text.strip() or len(text) > 20000:
            raise HTTPException(422, 'Răspunsul trebuie să conțină între 1 și 20000 de caractere.')
        if question['answer_type'] == 'multiple_choice' and text not in {
            option['id'] for option in question['question_config'].get('options', [])
        }:
            raise HTTPException(422, 'Alege una dintre variantele disponibile.')
        data = {'text': text}
    answer = next((item for item in attempt.answers if item.question_id == question_id), None)
    current = {'state': answer.state, 'answer_data': answer.answer_data} if answer else None
    expected = answer_input.expected_answer.model_dump(mode='json') if answer_input.expected_answer else None
    if current != expected:
        raise HTTPException(409, 'Răspunsul a fost modificat în altă filă. Reîncarcă pagina înainte de a continua.')
    if answer is None:
        answer = AssessmentAnswer(attempt_id=attempt.id, question_id=question_id)
        db.add(answer)
    answer.state, answer.answer_data = state, data
    db.commit()
    db.refresh(answer)
    return answer


def submit_attempt(db: Session, attempt_id: int, user_id: int) -> AssessmentAttempt:
    # Keep submission atomic. A failed Judge0 request leaves the saved attempt
    # editable; retries cannot create duplicate results or plans.
    db.query(User).filter(User.id == user_id).with_for_update().one()
    attempt = get_owned_attempt(db, attempt_id, user_id, lock=True)
    if attempt.status == 'SUBMITTED':
        return attempt
    if completed_initial_attempt(db, user_id):
        raise HTTPException(409, 'Evaluarea inițială este deja finalizată.')
    questions = attempt.question_snapshot
    if not questions:
        raise HTTPException(409, 'Reia evaluarea pentru a încărca exercițiile actuale.')
    answers = {answer.question_id: answer for answer in attempt.answers}
    evaluations = {}
    for question in questions:
        answer = answers.get(question['id'])
        if answer is None:
            answer = AssessmentAnswer(attempt_id=attempt.id, question_id=question['id'], state='unanswered')
            db.add(answer)
        answer.evaluation = grade_answer(question, answer)
        evaluations[question['id']] = answer.evaluation
    catalog = {concept.key: concept for concept in db.query(AssessmentConcept).all()}
    evidence = build_evidence(questions, evaluations, catalog)
    earned = sum(Decimal(str(value['earned_points'])) for value in evaluations.values())
    maximum = sum(question['points'] for question in questions)
    score = (earned / Decimal(maximum) * 100).quantize(Decimal('.01'), rounding=ROUND_HALF_UP) if maximum else Decimal(0)
    counts = {name: sum(value['outcome'] == name for value in evaluations.values()) for name in
              ('correct', 'partial', 'incorrect', 'not_learned', 'unanswered', 'compilation_error')}
    attempt.result = {
        'attempt_id': attempt.id, 'earned_points': float(earned), 'max_points': maximum,
        'assessment_score': float(score), 'counts': counts, 'evidence': evidence,
        'items': [{'question_id': question['id'], 'order': question['display_order'],
                   'prompt': question['prompt'], 'answer_type': question['answer_type'],
                   'options': question['question_config'].get('options', []),
                   'concepts': [{'key': key, 'label': catalog[key].label if key in catalog else key} for key in question['concept_refs']],
                   **evaluations[question['id']]} for question in questions],
    }
    profile = get_user_profile(db, user_id)
    create_plan(db, attempt, profile, evidence)
    attempt.status = 'SUBMITTED'
    attempt.submitted_at = datetime.now(timezone.utc).replace(tzinfo=None)
    if profile is not None:
        profile.assessment_status = AssessmentStatus.COMPLETED.value
    db.commit()
    db.refresh(attempt)
    return attempt


def get_result(db: Session, user_id: int, attempt_id: int | None = None) -> dict:
    if attempt_id is not None:
        attempt = get_owned_attempt(db, attempt_id, user_id)
    else:
        attempt = completed_initial_attempt(db, user_id)
    if attempt is None or not has_diagnostic_result(attempt):
        raise HTTPException(404, 'Nu există încă un rezultat corectat. Poți începe evaluarea inițială.')
    plan = db.query(PersonalizedPlan).filter_by(attempt_id=attempt.id, user_id=user_id).one_or_none()
    return {**attempt.result, 'plan': {'items': plan.items, 'context': plan.context} if plan else None}

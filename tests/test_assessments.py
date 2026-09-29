from copy import deepcopy
from datetime import datetime
from types import SimpleNamespace

import pytest
from fastapi import HTTPException

from app.database.schemas.assessment import Assessment, AssessmentAnswer, AssessmentAttempt, AssessmentQuestion, PersonalizedPlan
from app.database.schemas.user import User
from app.database.schemas.user_profile import UserProfile
from app.seed import seed_initial_assessment
from app.services import assessment_grading, assessment_seed, assessment_service, judge0_service
from app.services.assessment_grading import compare_output, grade_answer
from app.services.auth_service import create_access_token


def prepare_assessment(db_session):
    seed_initial_assessment(db_session)
    db_session.commit()


def complete_onboarding(client):
    assert client.put('/onboarding', json={
        'grade': 'GRADE_12', 'study_profile': 'MATH_INFO', 'self_assessment': 'BEGINNER',
    }).status_code == 200


@pytest.fixture
def started(authenticated_client, db_session):
    prepare_assessment(db_session)
    complete_onboarding(authenticated_client)
    response = authenticated_client.post('/assessments/initial/attempts')
    assert response.status_code == 200
    return response.json()


def save(client, attempt, index=0, state='answered', text='c', expected=None):
    return client.put(f"/assessments/attempts/{attempt['id']}/answers/{attempt['questions'][index]['id']}", json={
        'state': state, 'answer_data': {'text': text} if state == 'answered' else None,
        'expected_answer': expected,
    })


def submit(client, attempt):
    return client.post(f"/assessments/attempts/{attempt['id']}/submit")


def result(client, attempt):
    response = client.get(f"/assessments/attempts/{attempt['id']}/result")
    assert response.status_code == 200
    return response.json()


def test_current_content_and_no_private_data(authenticated_client, db_session):
    prepare_assessment(db_session)
    response = authenticated_client.get('/assessments/initial')
    assert response.status_code == 200
    questions = response.json()['questions']
    assert len(questions) == 10
    assert questions[0]['answer_type'] == 'multiple_choice'
    assert '6.3/20+24' in questions[0]['prompt']
    for question in questions:
        assert 'grading_config' not in question
        assert 'points' not in question
        assert set(question['question_config']) <= {'options', 'input_hint'}


def test_attempt_requires_completed_onboarding(authenticated_client, db_session):
    prepare_assessment(db_session)
    assert authenticated_client.post('/assessments/initial/attempts').status_code == 409


@pytest.mark.parametrize('method,path,payload', [
    ('get', '/assessments/initial', None),
    ('post', '/assessments/initial/attempts', None),
    ('put', '/assessments/attempts/1/answers/1', {'state': 'unanswered', 'expected_answer': None}),
    ('post', '/assessments/attempts/1/submit', None),
    ('get', '/assessments/initial/result', None),
    ('get', '/assessments/attempts/1/result', None),
])
def test_unauthenticated_access(client, method, path, payload):
    assert client.request(method, path, json=payload).status_code == 401


def test_ownership(authenticated_client, db_session, started):
    assert submit(authenticated_client, started).status_code == 200
    other = User(username='other', email='other@example.com', password_hash='unused')
    db_session.add(other)
    db_session.commit()
    authenticated_client.cookies.clear()
    authenticated_client.cookies.set('access_token', create_access_token(other.id))
    assert save(authenticated_client, started).status_code == 404
    assert submit(authenticated_client, started).status_code == 404
    assert authenticated_client.get(f"/assessments/attempts/{started['id']}/result").status_code == 404
    assert authenticated_client.get('/assessments/initial/result').status_code == 404


def test_lifecycle_answers_and_score(authenticated_client, db_session, started):
    assert save(authenticated_client, started).status_code == 200
    assert save(authenticated_client, started, 1, 'not_learned').status_code == 200
    assert save(authenticated_client, started, 2, 'unanswered').status_code == 200
    resumed = authenticated_client.post('/assessments/initial/attempts').json()
    assert resumed['id'] == started['id']
    assert len(resumed['answers']) == 3
    assert submit(authenticated_client, started).status_code == 200
    graded = result(authenticated_client, started)
    assert graded['earned_points'] == 4
    assert graded['max_points'] == 52
    assert graded['assessment_score'] == 7.69
    assert graded['counts'] == dict(correct=1, partial=0, incorrect=0, not_learned=1, unanswered=8, compilation_error=0)
    assert graded['items'][1]['outcome'] == 'not_learned'
    assert graded['items'][2]['outcome'] == 'unanswered'
    assert {a.state for a in db_session.query(AssessmentAnswer).all()} == {'answered', 'not_learned', 'unanswered'}
    assert db_session.query(AssessmentAnswer).count() == 10
    assert graded['plan'] is not None
    assert authenticated_client.get('/onboarding/me').json()['assessment_status'] == 'COMPLETED'
    assert save(authenticated_client, started).status_code == 409


def test_deferred_can_start_and_active_cannot_defer(authenticated_client, db_session):
    prepare_assessment(db_session)
    complete_onboarding(authenticated_client)
    assert authenticated_client.post('/onboarding/assessment/defer').json()['assessment_status'] == 'DEFERRED'
    first = authenticated_client.post('/assessments/initial/attempts').json()
    assert first['status'] == 'IN_PROGRESS'
    assert authenticated_client.post('/onboarding/assessment/defer').json()['assessment_status'] == 'IN_PROGRESS'
    assert authenticated_client.post('/assessments/initial/attempts').json()['id'] == first['id']


def test_completed_is_terminal_and_submit_idempotent(authenticated_client, db_session, started, monkeypatch):
    assert submit(authenticated_client, started).status_code == 200
    original = result(authenticated_client, started)
    def must_not_grade(*args):
        pytest.fail('A completed assessment must not be graded again')
    monkeypatch.setattr(assessment_service, 'grade_answer', must_not_grade)
    assert submit(authenticated_client, started).status_code == 200
    assert authenticated_client.post('/onboarding/assessment/defer').json()['assessment_status'] == 'COMPLETED'
    resumed = authenticated_client.post('/assessments/initial/attempts').json()
    assert resumed['id'] == started['id'] and resumed['status'] == 'SUBMITTED'
    assert result(authenticated_client, started) == original
    assert db_session.query(AssessmentAttempt).count() == 1
    assert db_session.query(PersonalizedPlan).count() == 1


def test_first_completed_result_authoritative_and_downgrade_repaired(authenticated_client, db_session, started):
    submit(authenticated_client, started)
    original = result(authenticated_client, started)
    first = db_session.get(AssessmentAttempt, started['id'])
    later_result = deepcopy(first.result)
    later = AssessmentAttempt(assessment_id=first.assessment_id, user_id=first.user_id,
        status='SUBMITTED', submitted_at=datetime.now(), question_snapshot=deepcopy(first.question_snapshot), result=later_result)
    db_session.add(later)
    db_session.flush()
    later.result = {**later_result, 'attempt_id': later.id}
    for answer in first.answers:
        db_session.add(AssessmentAnswer(attempt_id=later.id, question_id=answer.question_id,
            state=answer.state, answer_data=deepcopy(answer.answer_data), evaluation=deepcopy(answer.evaluation)))
    db_session.query(UserProfile).one().assessment_status = 'DEFERRED'
    db_session.commit()
    assert authenticated_client.get('/assessments/initial/result').json() == original
    assert authenticated_client.get('/onboarding/me').json()['assessment_status'] == 'COMPLETED'
    assert db_session.query(UserProfile).one().assessment_status == 'COMPLETED'
    assert authenticated_client.post('/assessments/initial/attempts').json()['id'] == first.id
    # Explicit historical retrieval remains available.
    assert authenticated_client.get(f'/assessments/attempts/{later.id}/result').status_code == 200


def test_later_active_restart_cannot_replace_baseline(authenticated_client, db_session, started):
    submit(authenticated_client, started)
    first = db_session.get(AssessmentAttempt, started['id'])
    later = AssessmentAttempt(assessment_id=first.assessment_id, user_id=first.user_id,
                              question_snapshot=deepcopy(first.question_snapshot))
    db_session.add(later)
    db_session.commit()
    assert submit(authenticated_client, {'id': later.id}).status_code == 409
    assert authenticated_client.post('/assessments/initial/attempts').json()['id'] == first.id


def test_snapshot_resume_after_live_changes(authenticated_client, db_session, started):
    save(authenticated_client, started)
    assessment = db_session.query(Assessment).one()
    assessment.is_published = False
    for question in assessment.questions:
        question.prompt = 'Changed live content'
        question.grading_config = None
    db_session.commit()
    resumed = authenticated_client.post('/assessments/initial/attempts')
    assert resumed.status_code == 200
    assert resumed.json()['questions'] == started['questions']
    assert resumed.json()['answers'][0]['answer_data'] == {'text': 'c'}
    assert submit(authenticated_client, started).status_code == 200
    assert result(authenticated_client, started)['earned_points'] == 4


def test_stale_answer_cannot_overwrite_server(authenticated_client, db_session, started):
    first = save(authenticated_client, started)
    assert first.status_code == 200
    assert save(authenticated_client, started, state='unanswered').status_code == 409
    base = {'state': 'answered', 'answer_data': {'text': 'c'}}
    assert save(authenticated_client, started, text='a', expected=base).status_code == 200
    assert save(authenticated_client, started, text='b', expected=base).status_code == 409
    answer = db_session.query(AssessmentAnswer).one()
    assert answer.answer_data == {'text': 'a'}
    assert save(authenticated_client, started, state='not_learned', expected={'state': 'answered', 'answer_data': {'text': 'a'}}).status_code == 200
    assert db_session.query(AssessmentAnswer).count() == 1


def test_finish_does_not_require_rewriting_other_tabs_answers(authenticated_client, started):
    save(authenticated_client, started)
    assert submit(authenticated_client, started).status_code == 200
    assert result(authenticated_client, started)['earned_points'] == 4


def test_invalid_ids_and_payloads(authenticated_client, started):
    path = f"/assessments/attempts/{started['id']}/answers/{started['questions'][0]['id']}"
    for payload in [
        {}, {'state': 'answered', 'expected_answer': None},
        {'state': 'not_learned', 'answer_data': {'text': 'c'}, 'expected_answer': None},
        {'state': 'wrong', 'expected_answer': None},
        {'state': 'answered', 'answer_data': {'text': 'z'}, 'expected_answer': None},
        {'state': 'answered', 'answer_data': {'text': ' '}, 'expected_answer': None},
        {'state': 'answered', 'answer_data': {'text': 'x' * 20001}, 'expected_answer': None},
        {'state': 'unanswered'},
    ]:
        assert authenticated_client.put(path, json=payload).status_code == 422
    payload = {'state': 'unanswered', 'expected_answer': None}
    assert authenticated_client.put(f"/assessments/attempts/{started['id']}/answers/99999", json=payload).status_code == 404
    assert authenticated_client.put('/assessments/attempts/99999/answers/1', json=payload).status_code == 404
    assert authenticated_client.post('/assessments/attempts/99999/submit').status_code == 404


def test_not_learned_restriction(authenticated_client, db_session, started):
    attempt = db_session.get(AssessmentAttempt, started['id'])
    snapshot = deepcopy(attempt.question_snapshot)
    snapshot[0]['allow_not_learned'] = False
    attempt.question_snapshot = snapshot
    db_session.commit()
    assert save(authenticated_client, started, state='not_learned').status_code == 422


@pytest.mark.parametrize('status', ['IN_PROGRESS', 'SUBMITTED'])
def test_legacy_history_is_preserved(authenticated_client, db_session, status):
    prepare_assessment(db_session)
    complete_onboarding(authenticated_client)
    assessment = db_session.query(Assessment).one()
    legacy = AssessmentAttempt(assessment_id=assessment.id, user_id=1, status=status,
                               submitted_at=datetime.now() if status == 'SUBMITTED' else None)
    db_session.add(legacy)
    db_session.flush()
    db_session.add(AssessmentAnswer(attempt_id=legacy.id, question_id=assessment.questions[0].id,
                                    state='answered', answer_data={'text': 'placeholder history'}))
    db_session.query(UserProfile).one().assessment_status = 'COMPLETED' if status == 'SUBMITTED' else 'IN_PROGRESS'
    db_session.commit()
    assert authenticated_client.get('/onboarding/me').json()['assessment_status'] == 'NOT_STARTED'
    modern = authenticated_client.post('/assessments/initial/attempts').json()
    assert modern['id'] != legacy.id
    assert len(modern['questions']) == 10
    assert db_session.get(AssessmentAttempt, legacy.id).question_snapshot is None
    assert db_session.query(AssessmentAnswer).filter_by(attempt_id=legacy.id).one().answer_data == {'text': 'placeholder history'}
    assert authenticated_client.get(f'/assessments/attempts/{legacy.id}/result').status_code == 404


def test_import_retires_questions_without_destroying_history(authenticated_client, db_session, started, tmp_path, monkeypatch):
    import json
    source = json.loads(assessment_seed.CONTENT_PATH.read_text())
    source['questions'] = source['questions'][:-2]
    path = tmp_path / 'initial.json'
    path.write_text(json.dumps(source))
    monkeypatch.setattr(assessment_seed, 'CONTENT_PATH', path)
    prepare_assessment(db_session)
    assert db_session.query(AssessmentQuestion).count() == 10
    assert db_session.query(AssessmentQuestion).filter_by(is_active=True).count() == 8
    assert len(authenticated_client.get('/assessments/initial').json()['questions']) == 8
    assert len(authenticated_client.post('/assessments/initial/attempts').json()['questions']) == 10
    assert submit(authenticated_client, started).status_code == 200
    assert result(authenticated_client, started)['max_points'] == 52
    other = User(username='new', email='new@example.com', password_hash='unused')
    db_session.add(other)
    db_session.commit()
    authenticated_client.cookies.clear()
    authenticated_client.cookies.set('access_token', create_access_token(other.id))
    complete_onboarding(authenticated_client)
    new = authenticated_client.post('/assessments/initial/attempts').json()
    assert len(new['questions']) == 8
    assert submit(authenticated_client, new).status_code == 200
    assert result(authenticated_client, new)['max_points'] == 36


@pytest.mark.parametrize('actual,expected', [('45 15 9 1', True), ('1 1 9 15 45', False), ('1 9 15', False), ('1 9 15 45 x', False)])
def test_unordered_integer_multiplicity(actual, expected):
    assert compare_output(actual, [1, 9, 15, 45], 'integer_set') is expected


def test_current_choice_output_and_nonanswer_grading(db_session):
    prepare_assessment(db_session)
    questions = assessment_service.snapshot_questions(db_session.query(Assessment).one())
    def answer(text):
        return SimpleNamespace(state='answered', answer_data={'text': text})
    assert grade_answer(questions[0], answer('c'))['earned_points'] == 4
    assert grade_answer(questions[0], answer('a'))['outcome'] == 'incorrect'
    assert grade_answer(questions[8], answer('  7fantastic\r\n'))['earned_points'] == 6
    assert grade_answer(questions[8], answer('7Fantastic'))['outcome'] == 'incorrect'
    assert grade_answer(questions[8], answer('7 fantastic'))['outcome'] == 'incorrect'
    for state in ['not_learned', 'unanswered']:
        evaluated = grade_answer(questions[0], SimpleNamespace(state=state, answer_data=None))
        assert evaluated['outcome'] == state and evaluated['earned_points'] == 0


def test_code_partial_credit_and_compilation(db_session, monkeypatch):
    prepare_assessment(db_session)
    question = assessment_service.snapshot_questions(db_session.query(Assessment).one())[6]
    outputs = iter(['0', '15', '-1', '-1', '-1'])
    monkeypatch.setattr(judge0_service, 'execute_submission', lambda *a, **k: SimpleNamespace(status=SimpleNamespace(id=3), stdout=next(outputs)))
    answer = SimpleNamespace(state='answered', answer_data={'text': 's=0;'})
    graded = grade_answer(question, answer)
    assert graded['earned_points'] == 2.4 and graded['outcome'] == 'partial'
    assert graded['passed_tests'] == 2 and graded['total_tests'] == 5
    monkeypatch.setattr(judge0_service, 'execute_submission', lambda *a, **k: SimpleNamespace(status=SimpleNamespace(id=6)))
    graded = grade_answer(question, answer)
    assert graded['outcome'] == 'compilation_error' and graded['earned_points'] == 0


def test_failed_grading_rolls_back_evidence(db_session, authenticated_client, started, monkeypatch):
    save(authenticated_client, started)
    save(authenticated_client, started, 6, text='s=0;')
    def unavailable(*args, **kwargs):
        raise HTTPException(503, 'Unavailable')
    monkeypatch.setattr(judge0_service, 'execute_submission', unavailable)
    # Use an independent request-like session so close rolls back failed grading.
    from sqlalchemy.orm import Session
    with Session(db_session.get_bind()) as transaction:
        with pytest.raises(HTTPException):
            assessment_service.submit_attempt(transaction, started['id'], 1)
    db_session.expire_all()
    attempt = db_session.get(AssessmentAttempt, started['id'])
    assert attempt.status == 'IN_PROGRESS' and attempt.result is None
    assert all(answer.evaluation is None for answer in attempt.answers)
    assert db_session.query(PersonalizedPlan).count() == 0
    assert db_session.query(UserProfile).one().assessment_status == 'IN_PROGRESS'


def test_missing_evaluations_are_not_diagnostic(authenticated_client, db_session, started):
    submit(authenticated_client, started)
    db_session.query(AssessmentAnswer).filter_by(attempt_id=started['id']).update({'evaluation': None})
    db_session.commit()
    assert authenticated_client.get('/assessments/initial/result').status_code == 404
    assert authenticated_client.get('/onboarding/me').json()['assessment_status'] == 'NOT_STARTED'
    modern = authenticated_client.post('/assessments/initial/attempts').json()
    assert modern['id'] != started['id']
    assert db_session.get(AssessmentAttempt, started['id']).result is not None


def test_missing_plan_does_not_erase_valid_grading(authenticated_client, db_session, started):
    submit(authenticated_client, started)
    db_session.query(PersonalizedPlan).delete()
    db_session.commit()
    assert authenticated_client.get('/onboarding/me').json()['assessment_status'] == 'COMPLETED'
    assert result(authenticated_client, started)['plan'] is None
    assert authenticated_client.post('/assessments/initial/attempts').json()['id'] == started['id']


def test_concurrent_starts_create_one_attempt(authenticated_client, db_session):
    from concurrent.futures import ThreadPoolExecutor
    from threading import Barrier
    from sqlalchemy.orm import Session
    prepare_assessment(db_session)
    complete_onboarding(authenticated_client)
    barrier = Barrier(2)
    engine = db_session.get_bind()
    def start(_):
        with Session(engine) as transaction:
            user = transaction.get(User, 1)
            barrier.wait(timeout=10)
            return assessment_service.start_initial_attempt(transaction, user).id
    with ThreadPoolExecutor(max_workers=2) as pool:
        ids = list(pool.map(start, range(2)))
    assert ids[0] == ids[1]
    assert db_session.query(AssessmentAttempt).count() == 1


def test_concurrent_stale_saves_have_one_winner(db_session, started):
    from concurrent.futures import ThreadPoolExecutor
    from threading import Barrier
    from sqlalchemy.orm import Session
    from app.models.assessments import AssessmentAnswerInput
    barrier = Barrier(2)
    engine = db_session.get_bind()
    def write(text):
        with Session(engine) as transaction:
            barrier.wait(timeout=10)
            try:
                assessment_service.save_answer(transaction, started['id'], started['questions'][0]['id'], 1,
                    AssessmentAnswerInput(state='answered', answer_data={'text': text}, expected_answer=None))
                return 200
            except HTTPException as error:
                return error.status_code
    with ThreadPoolExecutor(max_workers=2) as pool:
        statuses = list(pool.map(write, ['a', 'c']))
    assert sorted(statuses) == [200, 409]
    assert db_session.query(AssessmentAnswer).count() == 1


def test_concurrent_submit_grades_once(db_session, started, monkeypatch):
    from concurrent.futures import ThreadPoolExecutor
    from threading import Barrier
    from sqlalchemy.orm import Session
    barrier = Barrier(2)
    engine = db_session.get_bind()
    calls = []
    original = assessment_service.grade_answer
    def grade(question, answer):
        calls.append(question['id'])
        return original(question, answer)
    monkeypatch.setattr(assessment_service, 'grade_answer', grade)
    def finish(_):
        with Session(engine) as transaction:
            barrier.wait(timeout=10)
            return assessment_service.submit_attempt(transaction, started['id'], 1).status
    with ThreadPoolExecutor(max_workers=2) as pool:
        assert list(pool.map(finish, range(2))) == ['SUBMITTED', 'SUBMITTED']
    assert len(calls) == 10
    assert db_session.query(PersonalizedPlan).count() == 1


def test_active_question_migration_preserves_existing_rows(db_session, started):
    from pathlib import Path
    # Only the configured test database is used by this fixture. Simulate the
    # pre-011 schema and execute the actual migration, including a repeat run.
    db_session.rollback()
    raw = db_session.get_bind().raw_connection()
    try:
        raw.driver_connection.autocommit = True
        with raw.cursor() as cursor:
            cursor.execute('ALTER TABLE assessment_questions DROP COLUMN is_active')
            migration = Path('migrations/011_assessment_active_questions.sql').read_text()
            cursor.execute(migration)
            cursor.execute(migration)
            cursor.execute('SELECT count(*) FROM assessment_questions WHERE is_active')
            assert cursor.fetchone()[0] == 10
            cursor.execute('SELECT question_snapshot FROM assessment_attempts WHERE id = %s', (started['id'],))
            assert len(cursor.fetchone()[0]) == 10
        raw.commit()
    finally:
        raw.driver_connection.autocommit = False
        raw.close()

from weakref import finalize

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.database.schemas.problem import Problem

from app.models.enums import Verdict
from app.models.submissions import SubmissionRequest, SubmissionResponse

from app.services import judge0_service, user_submission_service
from app.services.verdict_mapare import map_judge0_status


def submit_solution(db: Session, problem_id: int, submission: SubmissionRequest,) -> SubmissionResponse:

    # Cautăm problema
    problem = db.get(Problem, problem_id)

    if problem is None:
        raise HTTPException(
            status_code=404,
            detail="Problem not found"
        )

    tests = problem.tests
    passed_tests = 0
    total_tests = len(tests)

    final_verdict = Verdict.ACCEPTED

    for test in tests:
        result = judge0_service.execute_submission(source_code=submission.source_code, stdin=test.input)
        verdict = map_judge0_status(result.status.description)

        if verdict != Verdict.ACCEPTED:
            final_verdict = verdict
            break;

        expected_output = test.expected_output.strip()
        actual_output = (result.stdout or "").strip()

        if actual_output != expected_output:
            final_verdict = Verdict.WRONG_ANSWER
            break;

        passed_tests += 1

    user_submission_service.save_submission(db=db, user_id=1, problem_id=problem.id, source_code=submission.source_code, verdict=final_verdict, passed_tests=passed_tests, total_tests=total_tests)
    return SubmissionResponse(verdict=Verdict.ACCEPTED, passed_tests=passed_tests, total_tests=total_tests)
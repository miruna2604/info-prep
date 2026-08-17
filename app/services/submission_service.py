from sys import stdin

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.database.schemas.problem import Problem

from app.models.enums import Verdict
from app.models.submissions import (RunRequest, RunResponse, SubmissionRequest, SubmissionResponse)

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
            break

        expected_output = test.expected_output.strip()
        actual_output = (result.stdout or "").strip()

        if actual_output != expected_output:
            final_verdict = Verdict.WRONG_ANSWER
            break

        passed_tests += 1

    user_submission_service.save_submission(db=db, user_id=submission.user_id, problem_id=problem.id, source_code=submission.source_code, verdict=final_verdict, passed_tests=passed_tests, total_tests=total_tests)
    return SubmissionResponse(verdict=final_verdict, passed_tests=passed_tests, total_tests=total_tests)

def run_code(run_request: RunRequest) -> RunResponse:
    result = judge0_service.execute_submission(
        source_code=run_request.source_code,
        stdin=run_request.stdin,
    )

    return RunResponse(
        status=result.status.description,
        stdout=result.stdout,
        stderr=result.stderr,
        compile_output=result.compile_output,
        message=result.message,
        time=result.time,
        memory=result.memory,
    )
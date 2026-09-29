from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.database.schemas.problem import Problem

from app.models.enums import Verdict
from app.models.submissions import (
    RunRequest,
    RunResponse,
    SubmissionRequest,
    SubmissionResponse,
    SubmissionTestResponse,
)

from app.services import judge0_service, user_submission_service
from app.services.verdict_mapare import map_judge0_status


def submit_solution(db: Session, problem_id: int, user_id: int, submission: SubmissionRequest) -> SubmissionResponse:

    # Cautăm problema
    problem = db.get(Problem, problem_id)

    if problem is None:
        raise HTTPException(
            status_code=404,
            detail="Problem not found"
        )

    tests = sorted(problem.tests, key=lambda test: test.id)
    passed_tests = 0
    total_tests = len(tests)
    final_verdict = Verdict.ACCEPTED
    test_results: list[SubmissionTestResponse] = []
    stop_evaluation = False

    for number, test in enumerate(tests, start=1):
        if stop_evaluation:
            test_results.append(
                SubmissionTestResponse(
                    number=number,
                    is_hidden=test.is_hidden,
                    status="not_run",
                )
            )
            continue

        result = judge0_service.execute_submission(source_code=submission.source_code, stdin=test.input)
        verdict = map_judge0_status(result.status.description)
        expected_output = test.expected_output.strip()
        actual_output = (result.stdout or "").strip()

        if verdict == Verdict.ACCEPTED and actual_output != expected_output:
            verdict = Verdict.WRONG_ANSWER

        passed = verdict == Verdict.ACCEPTED
        if passed:
            passed_tests += 1
        elif final_verdict == Verdict.ACCEPTED:
            final_verdict = verdict

        test_results.append(
            SubmissionTestResponse(
                number=number,
                is_hidden=test.is_hidden,
                status="passed" if passed else "failed",
                verdict=verdict,
                input=None if test.is_hidden else test.input,
                expected_output=None if test.is_hidden else test.expected_output,
                actual_output=None if test.is_hidden or verdict == Verdict.COMPILATION_ERROR else result.stdout,
            )
        )

        if verdict not in (Verdict.ACCEPTED, Verdict.WRONG_ANSWER):
            stop_evaluation = True

    user_submission_service.save_submission(db=db, user_id=user_id, problem_id=problem.id, source_code=submission.source_code, verdict=final_verdict, passed_tests=passed_tests, total_tests=total_tests)
    return SubmissionResponse(
        verdict=final_verdict,
        passed_tests=passed_tests,
        total_tests=total_tests,
        tests=test_results,
    )

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

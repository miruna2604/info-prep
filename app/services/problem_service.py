from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.database.schemas.problem import Problem
from app.models.problems import (ProblemDetailResponse, ProblemExampleResponse, ProblemSummaryResponse)

def get_problem_by_slug(db: Session, problem_slug: str) -> ProblemDetailResponse:
    problem = (
        db.query(Problem).filter(Problem.slug == problem_slug).first()
    )

    if problem is None:
        raise HTTPException(status_code=404, detail="Problem not found")

    return ProblemDetailResponse(
        id=problem.id,
        slug=problem.slug,
        title=problem.title,
        subject=problem.subject,
        statement=problem.statement,
        input_description=problem.input_description,
        output_description=problem.output_description,
        constraints=problem.constraints,
        examples=[
            ProblemExampleResponse(
                input=problem.sample_input,
                output=problem.sample_output,
                explanation=None,
            )
        ],
        starter_code=problem.starter_code,
    )

def get_all_problems(db: Session) -> list[ProblemSummaryResponse]:
    problems = (
        db.query(Problem).order_by(Problem.id).all()
    )
    return [
        ProblemSummaryResponse.model_validate(problem)
        for problem in problems
    ]
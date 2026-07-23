from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.schemas.problem import Problem

def get_problem(db: Session, problem_id: int):
    problem = db.get(Problem, problem_id)
    if problem is None:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem

def get_all_problems(db: Session):
    problems = db.query(Problem).all()
    return problems
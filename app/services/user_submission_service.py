from sqlalchemy.orm import Session
from app.database.schemas.user_submission import UserSubmission
from app.models.enums import Verdict


def save_submission(db: Session, user_id: int, problem_id: int, source_code: str, verdict: Verdict, passed_tests: int, total_tests: int) -> UserSubmission:
    submission = UserSubmission(user_id=user_id, problem_id=problem_id, source_code=source_code, verdict=verdict.value, passed_tests=passed_tests, total_tests=total_tests)
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission
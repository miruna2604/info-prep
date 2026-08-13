from pydantic import BaseModel

from app.models.enums import Verdict


class SubmissionRequest(BaseModel):
    user_id: int
    source_code: str

class SubmissionResponse(BaseModel):
    verdict: Verdict
    passed_tests: int
    total_tests: int
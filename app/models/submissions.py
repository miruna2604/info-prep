from pydantic import BaseModel

from app.models.enums import Verdict


class SubmissionRequest(BaseModel):
    source_code: str

class SubmissionResponse(BaseModel):
    verdict: Verdict
    passed_tests: int
    total_tests: int
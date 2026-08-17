from pydantic import BaseModel

from app.models.enums import Verdict


class SubmissionRequest(BaseModel):
    user_id: int
    source_code: str

class SubmissionResponse(BaseModel):
    verdict: Verdict
    passed_tests: int
    total_tests: int


#legatura frontend backend
class RunRequest(BaseModel):
    source_code: str
    stdin: str = ""

class RunResponse(BaseModel):
    status: str
    stdout: str | None = None
    stderr: str | None = None
    compile_output: str | None = None
    message: str | None = None
    time: str | None = None
    memory: int | None = None
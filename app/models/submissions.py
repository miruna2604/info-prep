from typing import Literal

from pydantic import BaseModel, ConfigDict

from app.models.enums import Verdict


class SubmissionRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    source_code: str

class SubmissionTestResponse(BaseModel):
    number: int
    is_hidden: bool
    status: Literal["passed", "failed", "not_run"]
    verdict: Verdict | None = None
    input: str | None = None
    expected_output: str | None = None
    actual_output: str | None = None


class SubmissionResponse(BaseModel):
    verdict: Verdict
    passed_tests: int
    total_tests: int
    tests: list[SubmissionTestResponse]


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

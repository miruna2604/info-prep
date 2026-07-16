from pydantic import BaseModel

from app.models.judge0 import Judge0SubmissionResponse


#model request - describes the input
class SubmissionRequest(BaseModel):
    source_code: str
    stdin: str | None = None

class SubmissionResponse(BaseModel):
    stdout: str | None = None
    stderr: str | None = None
    compile_output: str | None = None
    status: str

    @classmethod
    def from_judge0(cls, response: Judge0SubmissionResponse) -> "SubmissionResponse":
        return cls(
            stdout=response.stdout,
            stderr=response.stderr,
            compile_output=response.compile_output,
            status=response.status.description
        )
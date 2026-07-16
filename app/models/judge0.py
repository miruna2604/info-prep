from pydantic import BaseModel

class Judge0SubmissionRequest(BaseModel):
    language_id: int
    source_code: str
    stdin: str | None = None

class Judge0Status(BaseModel):
    id: int
    description: str

class Judge0SubmissionResponse(BaseModel):
    stdout: str | None = None
    stderr: str | None = None
    compile_output: str | None = None
    message: str | None = None
    time: str | None = None
    memory: int | None = None
    exit_code: int | None = None
    status: Judge0Status
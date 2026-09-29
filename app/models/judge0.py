from pydantic import BaseModel

class Judge0SubmissionRequest(BaseModel):
    language_id: int
    source_code: str
    stdin: str | None = None
    cpu_time_limit: float | None = None
    wall_time_limit: float | None = None
    memory_limit: int | None = None
    max_file_size: int | None = None
    enable_network: bool | None = None

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
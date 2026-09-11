from pydantic import BaseModel, ConfigDict

class ProblemExampleResponse(BaseModel):
    input: str
    output: str
    explanation: str | None = None

class ProblemSummaryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    slug: str
    title: str
    subject: str

class ProblemDetailResponse(ProblemSummaryResponse):
    statement: str
    input_description: str
    output_description: str
    constraints: list[str]
    examples: list[ProblemExampleResponse]
    starter_code: str


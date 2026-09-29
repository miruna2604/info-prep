from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class AnswerState(str, Enum):
    ANSWERED = "answered"
    NOT_LEARNED = "not_learned"
    UNANSWERED = "unanswered"


class AssessmentQuestionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    display_order: int
    prompt: str
    answer_type: str
    question_config: dict[str, Any]
    concept_refs: list[str]
    allow_not_learned: bool = True

    @field_validator("question_config", mode="before")
    @classmethod
    def only_public_configuration(cls, value):
        # An explicit whitelist also protects future imported content.
        config = value or {}
        public = {}
        if "options" in config:
            public["options"] = [{"id": option["id"], "text": option["text"]} for option in config["options"]]
        if "input_hint" in config:
            public["input_hint"] = config["input_hint"]
        return public


class AssessmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    description: str
    questions: list[AssessmentQuestionResponse]


class AssessmentAnswerValue(BaseModel):
    state: AnswerState
    answer_data: dict[str, Any] | None = None

    @model_validator(mode="after")
    def validate_answer_data(self):
        if self.state == AnswerState.ANSWERED and self.answer_data is None:
            raise ValueError("An answered question needs answer_data")
        if self.state != AnswerState.ANSWERED and self.answer_data is not None:
            raise ValueError("Only answered questions may have answer_data")
        return self


class AssessmentAnswerInput(AssessmentAnswerValue):
    expected_answer: AssessmentAnswerValue | None


class AssessmentAnswerResponse(AssessmentAnswerValue):
    model_config = ConfigDict(from_attributes=True)

    question_id: int


class AssessmentAttemptResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    assessment_id: int
    status: str
    started_at: datetime
    submitted_at: datetime | None
    answers: list[AssessmentAnswerResponse]
    questions: list[AssessmentQuestionResponse] = Field(default_factory=list)


class ConceptEvidenceResponse(BaseModel):
    concept: str
    label: str
    classification: str
    sources: list[dict[str, Any]]
    explanation: str


class AssessmentItemResultResponse(BaseModel):
    question_id: int
    order: int
    prompt: str
    answer_type: str
    options: list[dict[str, str]]
    concepts: list[dict[str, str]]
    outcome: str
    verdict: str
    earned_points: float
    max_points: int
    passed_tests: int
    total_tests: int
    feedback: str
    explanation: str
    correct_answer: str | None = None


class PlanItemResponse(BaseModel):
    concept: str
    label: str
    chapter: str | None
    reason: str
    status: str
    priority: int
    classification: str
    lesson_route: str | None


class PersonalizedPlanResponse(BaseModel):
    items: list[PlanItemResponse]
    context: dict[str, Any]


class AssessmentResultResponse(BaseModel):
    attempt_id: int
    earned_points: float
    max_points: int
    assessment_score: float
    counts: dict[str, int]
    evidence: list[ConceptEvidenceResponse]
    items: list[AssessmentItemResultResponse]
    plan: PersonalizedPlanResponse | None

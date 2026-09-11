from pydantic import BaseModel


class QuizSummary(BaseModel):
    title: str
    lesson_title: str
    lesson_slug: str
    question_count: int


class QuizOptionResponse(BaseModel):
    id: int
    text: str
    display_order: int


class QuizQuestionResponse(BaseModel):
    source: str | None = None
    id: int
    text: str
    display_order: int
    options: list[QuizOptionResponse]


class QuizResponse(BaseModel):
    title: str
    chapter_title: str
    chapter_slug: str
    lesson_title: str
    lesson_slug: str
    questions: list[QuizQuestionResponse]


class QuizAnswerSubmission(BaseModel):
    question_id: int
    option_id: int


class QuizSubmission(BaseModel):
    answers: list[QuizAnswerSubmission]


class QuizQuestionResult(BaseModel):
    question_id: int
    selected_option_id: int | None
    correct_option_id: int
    is_correct: bool


class QuizResult(BaseModel):
    correct_answers: int
    total_questions: int
    questions: list[QuizQuestionResult]

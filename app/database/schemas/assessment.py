from datetime import datetime

from sqlalchemy import CheckConstraint, JSON, DateTime, ForeignKey, String, Text, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class Assessment(Base):
    __tablename__ = "assessments"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    is_published: Mapped[bool] = mapped_column(nullable=False, default=False)
    questions: Mapped[list["AssessmentQuestion"]] = relationship(
        back_populates="assessment", order_by="AssessmentQuestion.display_order"
    )
    attempts: Mapped[list["AssessmentAttempt"]] = relationship(back_populates="assessment")


class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"
    __table_args__ = (
        UniqueConstraint("assessment_id", "display_order", name="uq_assessment_question_order"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    assessment_id: Mapped[int] = mapped_column(ForeignKey("assessments.id"), nullable=False)
    display_order: Mapped[int] = mapped_column(nullable=False)
    prompt: Mapped[str] = mapped_column(Text, nullable=False)
    answer_type: Mapped[str] = mapped_column(String(30), nullable=False)
    question_config: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    concept_refs: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)
    is_active: Mapped[bool] = mapped_column(nullable=False, default=True, server_default="true")
    points: Mapped[int] = mapped_column(nullable=False, default=0, server_default="0")
    allow_not_learned: Mapped[bool] = mapped_column(nullable=False, default=True, server_default="true")
    grading_config: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    assessment: Mapped["Assessment"] = relationship(back_populates="questions")


class AssessmentAttempt(Base):
    __tablename__ = "assessment_attempts"
    __table_args__ = (
        CheckConstraint("status IN ('IN_PROGRESS', 'SUBMITTED')", name="assessment_attempt_status_check"),
        CheckConstraint(
            "(status = 'IN_PROGRESS' AND submitted_at IS NULL) "
            "OR (status = 'SUBMITTED' AND submitted_at IS NOT NULL)",
            name="assessment_attempt_submission_consistency",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    assessment_id: Mapped[int] = mapped_column(ForeignKey("assessments.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    status: Mapped[str] = mapped_column(
        String(20), nullable=False, default="IN_PROGRESS", server_default="IN_PROGRESS"
    )
    started_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now())
    submitted_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    question_snapshot: Mapped[list[dict] | None] = mapped_column(JSON, nullable=True)
    result: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    assessment: Mapped["Assessment"] = relationship(back_populates="attempts")
    answers: Mapped[list["AssessmentAnswer"]] = relationship(back_populates="attempt")


class AssessmentAnswer(Base):
    __tablename__ = "assessment_answers"
    __table_args__ = (
        UniqueConstraint("attempt_id", "question_id", name="uq_assessment_answer_question"),
        CheckConstraint("state IN ('answered', 'not_learned', 'unanswered')", name="assessment_answer_state_check"),
        CheckConstraint(
            "(state = 'answered' AND answer_data IS NOT NULL) "
            "OR (state <> 'answered' AND answer_data IS NULL)",
            name="assessment_answer_data_consistency",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    attempt_id: Mapped[int] = mapped_column(ForeignKey("assessment_attempts.id"), nullable=False)
    question_id: Mapped[int] = mapped_column(ForeignKey("assessment_questions.id"), nullable=False)
    state: Mapped[str] = mapped_column(String(20), nullable=False)
    answer_data: Mapped[dict | None] = mapped_column(JSON(none_as_null=True), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), onupdate=func.now()
    )
    evaluation: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    attempt: Mapped["AssessmentAttempt"] = relationship(back_populates="answers")


class AssessmentConcept(Base):
    """Concept catalog; question associations use stable keys in concept_refs."""
    __tablename__ = "assessment_concepts"

    key: Mapped[str] = mapped_column(String(160), primary_key=True)
    label: Mapped[str] = mapped_column(String(200), nullable=False)
    chapter_slug: Mapped[str | None] = mapped_column(String(150), nullable=True)
    lesson_slug: Mapped[str | None] = mapped_column(String(150), nullable=True)
    prerequisites: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)
    planning_config: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)


class PersonalizedPlan(Base):
    """Ordered items are an immutable JSON snapshot with reason/status/priority."""
    __tablename__ = "personalized_plans"

    id: Mapped[int] = mapped_column(primary_key=True)
    attempt_id: Mapped[int] = mapped_column(ForeignKey("assessment_attempts.id"), unique=True, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    items: Mapped[list[dict]] = mapped_column(JSON, nullable=False)
    context: Mapped[dict] = mapped_column(JSON, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now())

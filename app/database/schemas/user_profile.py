from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)
    grade: Mapped[str] = mapped_column(String(20), nullable=False)
    study_profile: Mapped[str] = mapped_column(String(30), nullable=False)
    self_assessment: Mapped[str] = mapped_column(String(30), nullable=False)
    onboarding_completed: Mapped[bool] = mapped_column(nullable=False, default=False, server_default="false")
    assessment_status: Mapped[str] = mapped_column(String(20), nullable=False, default="NOT_STARTED", server_default="NOT_STARTED")
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    user: Mapped["User"] = relationship(back_populates="profile")

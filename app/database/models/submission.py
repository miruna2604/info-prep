from datetime import datetime

from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class Submission(Base):
    __tablename__ = "submissions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    problem_id: Mapped[int] = mapped_column(ForeignKey("problems.id"))
    source_code: Mapped[str] = mapped_column(nullable=False)
    status: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    user: Mapped["User"] = relationship(back_populates="submissions")
    problem: Mapped["Problem"] = relationship(back_populates="submissions")
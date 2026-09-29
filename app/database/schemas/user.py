from datetime import datetime
from sqlalchemy import DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.database import Base

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(nullable=False, unique=True)
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    password_hash: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now())
    submissions: Mapped[list["UserSubmission"]] = relationship(back_populates="user")
    profile: Mapped["UserProfile | None"] = relationship(back_populates="user", uselist=False)

    @property
    def onboarding_completed(self) -> bool:
        return self.profile is not None and self.profile.onboarding_completed

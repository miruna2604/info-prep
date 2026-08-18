from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from app.database.database import Base

class Lesson(Base):
    __tablename__ = "lessons"
    id: Mapped[int] = mapped_column(primary_key=True)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"))
    title: Mapped[str] = mapped_column(nullable=False)
    video_url: Mapped[str | None] = mapped_column(nullable=True)
    pdf_url: Mapped[str | None] = mapped_column(nullable=True)
    display_order: Mapped[int] = mapped_column(nullable=False)
    chapter: Mapped["Chapter"] = relationship(back_populates="lessons")

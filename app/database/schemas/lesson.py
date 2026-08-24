from sqlalchemy import ForeignKey, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base

class Lesson(Base):
    __tablename__ = "lessons"

    __table_args__ = (
        UniqueConstraint("chapter_id", "slug", name="uq_lesson_chapter_slug"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"))
    title: Mapped[str] = mapped_column(nullable=False)
    slug: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    video_url: Mapped[str | None] = mapped_column(nullable=True)
    pdf_url: Mapped[str | None] = mapped_column(nullable=True)
    display_order: Mapped[int] = mapped_column(nullable=False)
    is_published: Mapped[bool] = mapped_column(default=False, nullable=False)
    chapter: Mapped["Chapter"] = relationship(back_populates="lessons")
    quiz: Mapped["Quiz | None"] = relationship(back_populates="lesson")

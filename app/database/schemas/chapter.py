from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base

class Chapter(Base):
    __tablename__ = "chapters"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    slug: Mapped[str] = mapped_column(unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    display_order: Mapped[int] = mapped_column(nullable=False)
    is_published: Mapped[bool] = mapped_column(default=False, nullable=False)
    lessons: Mapped[list["Lesson"]] = relationship(back_populates="chapter")
    problems: Mapped[list["Problem"]] = relationship(back_populates="chapter")

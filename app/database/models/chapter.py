from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.database import Base

class Chapter(Base):
    __tablename__ = "chapters"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    display_order: Mapped[int] = mapped_column(nullable=False)
    lessons: Mapped[list["Lesson"]] = relationship(back_populates="chapter")
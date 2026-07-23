from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Text
from app.database.database import Base

class Problem(Base):
    __tablename__ = "problems"
    id: Mapped[int] = mapped_column(primary_key=True)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"))
    title: Mapped[str] = mapped_column(nullable=False)
    statement: Mapped[str] = mapped_column(Text, nullable=False)
    input_description: Mapped[str] = mapped_column(nullable=False)
    output_description: Mapped[str] = mapped_column(nullable=False)
    sample_input: Mapped[str] = mapped_column(nullable=False)
    sample_output: Mapped[str] = mapped_column(nullable=False)
    chapter: Mapped["Chapter"] = relationship(back_populates="problems")
    tests: Mapped[list["ProblemTest"]] = relationship(back_populates="problem")
    submissions: Mapped[list["UserSubmission"]] = relationship(back_populates="problem")

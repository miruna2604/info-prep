from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Text, JSON
from app.database.database import Base

class Problem(Base):
    __tablename__ = "problems"
    id: Mapped[int] = mapped_column(primary_key=True)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"))

    slug: Mapped[str] = mapped_column(unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(nullable=False)
    subject: Mapped[str] = mapped_column(nullable=False)

    statement: Mapped[str] = mapped_column(Text, nullable=False)
    input_description: Mapped[str] = mapped_column( Text, nullable=False)
    output_description: Mapped[str] = mapped_column(Text, nullable=False)
    constraints: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    starter_code: Mapped[str] = mapped_column(Text, nullable=False)

    sample_input: Mapped[str] = mapped_column(Text, nullable=False)
    sample_output: Mapped[str] = mapped_column(Text, nullable=False)
    chapter: Mapped["Chapter"] = relationship(back_populates="problems")

    tests: Mapped[list["ProblemTest"]] = relationship(back_populates="problem")
    submissions: Mapped[list["UserSubmission"]] = relationship(back_populates="problem")

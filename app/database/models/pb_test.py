from sqlalchemy.orm import Mapped, mapped_column
from app.database.database import Base
from sqlalchemy import ForeignKey, Boolean


class ProblemTest(Base):
    __tablename__ = "problem_tests"
    id: Mapped[int] = mapped_column(primary_key=True)
    problem_id: Mapped[int] = mapped_column(ForeignKey("problems.id"))
    input: Mapped[str] = mapped_column(nullable=False)
    expected_output: Mapped[str] = mapped_column(nullable=False)
    is_hidden: Mapped[bool] = mapped_column(Boolean, nullable=False)

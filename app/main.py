from app.routers.submissions import router as submissions_router
from app.routers.problems import router as problems_router
from app.routers.chapters import router as chapter_router
from fastapi import FastAPI
from app.database.database import Base, engine

# importăm modelele
from app.database.schemas.user import User
from app.database.schemas.chapter import Chapter
from app.database.schemas.lesson import Lesson
from app.database.schemas.problem import Problem
from app.database.schemas.pb_test import ProblemTest
from app.database.schemas.user_submission import UserSubmission

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(submissions_router)
app.include_router(problems_router)
app.include_router(chapter_router)


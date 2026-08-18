from app.routers.submissions import router as submissions_router
from app.routers.problems import router as problems_router
from app.routers.chapters import router as chapters_router
from app.routers.lessons import router as lessons_router
from fastapi import FastAPI
from app.database.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

# importăm modelele
from app.database.schemas.user import User
from app.database.schemas.chapter import Chapter
from app.database.schemas.lesson import Lesson
from app.database.schemas.problem import Problem
from app.database.schemas.pb_test import ProblemTest
from app.database.schemas.user_submission import UserSubmission

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(submissions_router)
app.include_router(problems_router)
app.include_router(chapters_router)
app.include_router(lessons_router)


from app.routers.submissions import router
from fastapi import FastAPI
from app.database.database import Base, engine

# importăm modelele
from app.database.models.user import User
from app.database.models.chapter import Chapter
from app.database.models.lesson import Lesson
from app.database.models.problem import Problem
from app.database.models.pb_test import ProblemTest
from app.database.models.submission import Submission

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(router)


from app.database.database import SessionLocal
from app.database.models import Chapter, Lesson

db = SessionLocal()

x = db.query(Chapter).filter(Chapter.id == 2).one()
print(x.title)
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.auth import RegisterRequest, UserResponse
from app.services.auth_service import register_user

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(registration: RegisterRequest, db: Session = Depends(get_db)) -> UserResponse:
    user = register_user(db=db, registration=registration)
    return UserResponse.model_validate(user)

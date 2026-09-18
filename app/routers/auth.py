from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.schemas.user import User
from app.dependencies.auth import get_current_user
from app.models.auth import LoginRequest, RegisterRequest, UserResponse
from app.services.auth_service import authenticate_user, create_access_token, register_user
from app.config import AUTH_TOKEN_EXPIRE_MINUTES

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(registration: RegisterRequest, db: Session = Depends(get_db)) -> UserResponse:
    user = register_user(db=db, registration=registration)
    return UserResponse.model_validate(user)

@router.post("/login", response_model=UserResponse)
def login(login_data: LoginRequest, response: Response, db: Session = Depends(get_db)) -> UserResponse:
    user = authenticate_user(db=db, email=str(login_data.email), password=login_data.password.get_secret_value())
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = create_access_token(user_id=user.id)
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=AUTH_TOKEN_EXPIRE_MINUTES*60, path="/")
    return UserResponse.model_validate(user)

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)) -> UserResponse:
    return UserResponse.model_validate(current_user)

@router.post(
    "/logout",
    status_code=status.HTTP_204_NO_CONTENT,
)
def logout(response: Response) -> None:
    response.delete_cookie(key="access_token", path="/", httponly=True, secure=False, samesite="lax")
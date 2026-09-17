from fastapi import Cookie, Depends, HTTPException, status
from jwt import InvalidTokenError
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.schemas.user import User
from app.services.auth_service import decode_access_token

def get_current_user(access_token: str | None = Cookie(default=None), db: Session = Depends(get_db)) -> User:
    authentification_error = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail = "Not authenticated")
    if access_token is None:
        raise authentification_error
    try:
        user_id = decode_access_token(access_token)
    except InvalidTokenError as error:
        raise authentification_error from error

    user = db.get(User, user_id)
    if user is None:
        raise authentification_error
    return user


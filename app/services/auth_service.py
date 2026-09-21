from datetime import datetime, timedelta, timezone

import jwt
from jwt import InvalidTokenError
from pwdlib import PasswordHash

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from app.database.schemas.user import User
from app.models.auth import RegisterRequest

from pwdlib.exceptions import UnknownHashError

from app.config import (
    AUTH_ALGORITHM,
    AUTH_SECRET_KEY,
    AUTH_TOKEN_EXPIRE_MINUTES
)

password_hasher = PasswordHash.recommended()

def hash_password(plain_password: str) -> str:
    return password_hasher.hash(plain_password)

def verify_password(plain_password: str, password_hash: str) -> bool:
    try:
        return password_hasher.verify(plain_password, password_hash)
    except UnknownHashError:
        return False

def create_access_token(user_id: int, expires_delta: timedelta | None = None) -> str:
    issued_at = datetime.now(timezone.utc)
    if expires_delta is None:
        expires_delta = timedelta(minutes=AUTH_TOKEN_EXPIRE_MINUTES)
    expires_at = issued_at + expires_delta
    payload = {
        "sub": str(user_id),
        "iat": issued_at,
        "exp": expires_at
    }
    return jwt.encode(payload, AUTH_SECRET_KEY, algorithm=AUTH_ALGORITHM)

def decode_access_token(token: str) -> int:
    payload = jwt.decode(token, AUTH_SECRET_KEY, algorithms=[AUTH_ALGORITHM], options={"require": ["sub", "iat", "exp"]})
    subject = payload["sub"]
    try:
        return int(subject)
    except (TypeError, ValueError) as error:
        raise InvalidTokenError("Token subject is invalid") from error

def register_user(db: Session, registration: RegisterRequest) -> User:
    normalized_email = str(registration.email).lower()
    existing_email = (db.query(User).filter(User.email == normalized_email).first())
    if existing_email is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email is already registered")
    existing_username = (db.query(User).filter(User.username == registration.username).first())
    if existing_username is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username is already registered")
    user = User(username=registration.username, email=normalized_email, password_hash=hash_password(registration.password.get_secret_value()))
    db.add(user)
    try:
        db.commit()
    except IntegrityError as error:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username or email is already registered") from error
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str) -> User | None:
    normalized_email = email.lower()
    user = (db.query(User).filter(User.email == normalized_email).first())
    if user is None:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user
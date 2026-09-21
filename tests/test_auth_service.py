import jwt
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError, MissingRequiredClaimError
from datetime import timedelta, datetime, timezone
import pytest
from app.services.auth_service import hash_password, verify_password, create_access_token, decode_access_token, register_user, authenticate_user
from app.config import (AUTH_ALGORITHM, AUTH_SECRET_KEY, AUTH_TOKEN_EXPIRE_MINUTES)
from app.database.schemas.user import User
from app.models.auth import RegisterRequest
from fastapi import status, HTTPException

def test_hash_password_does_not_return_plain_password():
    plain_password = "parola123"
    hashed_password = hash_password(plain_password)
    assert plain_password != hashed_password
    assert hashed_password.startswith("$argon2")

def test_hash_password_generates_different_hashes():
    plain_password = "parola123"
    first_hash = hash_password(plain_password)
    second_hash = hash_password(plain_password)
    assert first_hash != second_hash

def test_verify_password_accepts_correct_password():
    plain_password = "parola123"
    hashed_password = hash_password(plain_password)
    is_valid = verify_password(plain_password, hashed_password)
    assert is_valid is True

def test_verify_password_rejects_incorrect_password():
    hashed_password = hash_password("parola-corecta")
    is_valid = verify_password("parola-gresita", hashed_password)
    assert is_valid is False

def test_create_access_token_contains_user_identity():
    token = create_access_token(user_id=42)
    payload = jwt.decode(token, AUTH_SECRET_KEY, algorithms=[AUTH_ALGORITHM])
    assert isinstance(token, str)
    assert payload["sub"] == "42"
    assert "iat" in payload
    assert "exp" in payload
    assert (payload["exp"] - payload["iat"] == AUTH_TOKEN_EXPIRE_MINUTES*60)

def test_decode_access_token_returns_user_id():
    token = create_access_token(user_id=42)
    user_id = decode_access_token(token)
    assert user_id == 42
    assert isinstance(user_id, int)

def test_decode_access_token_rejects_tampered_token():
    token = create_access_token(user_id=42)
    header, payload, signature = token.split(".")
    replacement = "a" if signature[0] != "a" else "b"
    tampered_signature = replacement + signature[1:]
    tampered_token = ".".join([header, payload, tampered_signature])
    with pytest.raises(InvalidTokenError):
        decode_access_token(tampered_token)

def test_decode_access_token_rejects_expired_token():
    token = create_access_token(user_id=42, expires_delta=timedelta(seconds=-1))
    with pytest.raises(ExpiredSignatureError):
        decode_access_token(token)

def test_decode_access_token_rejects_token_without_subject():
    issued_at = datetime.now(timezone.utc)
    token = jwt.encode(
        {
            "iat": issued_at,
            "exp": issued_at + timedelta(minutes=5)
        },
        AUTH_SECRET_KEY,
        algorithm=AUTH_ALGORITHM
    )
    with pytest.raises(MissingRequiredClaimError):
        decode_access_token(token)

def test_decode_access_token_rejects_non_numeric_subject():
    issued_at = datetime.now(timezone.utc)
    token = jwt.encode(
        {
            "sub": "nume",
            "iat": issued_at,
            "exp": issued_at + timedelta(minutes=5)
        },
        AUTH_SECRET_KEY,
        algorithm=AUTH_ALGORITHM
    )
    with pytest.raises(InvalidTokenError, match="Token subject is invalid"):
        decode_access_token(token)

def test_register_user_saves_user_with_hashed_password(db_session):
    registration = RegisterRequest(username="new-user", email="New.User@Example.COM", password="parola123")
    user = register_user(db=db_session, registration=registration)
    saved_user = db_session.get(User, user.id)
    assert user.id is not None
    assert saved_user is not None
    assert saved_user.username == "new-user"
    assert saved_user.email == "new.user@example.com"
    assert saved_user.password_hash != "parola123"
    assert verify_password(
        "parola123",
        saved_user.password_hash,
    )

def test_register_user_rejects_duplicate_email(db_session):
    registration = RegisterRequest(username="different-user", email="TEST@EXAMPLE.COM", password="parola123")
    with pytest.raises(HTTPException) as exception_info:
        register_user(db = db_session, registration=registration)
    assert (exception_info.value.status_code == status.HTTP_409_CONFLICT)
    assert (exception_info.value.detail == "Email is already registered")

def test_register_user_rejects_duplicate_username(db_session):
    registration = RegisterRequest(username="test-user", email="different@example.com", password="parola123")
    with pytest.raises(HTTPException) as exception_info:
        register_user(db = db_session, registration=registration)
    assert exception_info.value.status_code == status.HTTP_409_CONFLICT
    assert exception_info.value.detail == "Username is already registered"

def test_authenticate_user_accepts_correct_credentials(db_session):
    user = authenticate_user(db_session, email="test@example.com", password="test-password")
    assert user is not None
    assert user.email == "test@example.com"
    assert user.username == "test-user"

def test_authenticate_user_rejects_wrong_email(db_session):
    user = authenticate_user(db_session, email="wrongemail@example.com", password="test-password")
    assert user is None

def test_authenticate_user_rejects_wrong_password(db_session):
    user = authenticate_user(db_session, email="test@example.com", password="wrong-password")
    assert user is None

def test_verify_password_rejects_unknown_hash_format():
    is_valid = verify_password(
        "parola123",
        "not-a-real-password-hash",
    )
    assert is_valid is False
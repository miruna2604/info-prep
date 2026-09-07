import jwt
from jwt.exceptions import InvalidTokenError
import pytest

from app.services.auth_service import hash_password, verify_password, create_access_token, decode_access_token
from app.config import (AUTH_ALGORITHM, AUTH_SECRET_KEY, AUTH_TOKEN_EXPIRE_MINUTES)

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
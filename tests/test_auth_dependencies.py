from xml.sax.saxutils import escape

import pytest
from fastapi import HTTPException, status
from app.dependencies.auth import get_current_user
from app.database.schemas import User
from app.services.auth_service import create_access_token


def test_get_current_user_rejects_missing_token(db_session):
    with pytest.raises(HTTPException) as exception_info:
        get_current_user(access_token=None, db=db_session)
    assert exception_info.value.status_code == status.HTTP_401_UNAUTHORIZED
    assert exception_info.value.detail == "Not authenticated"

def test_get_current_user_returns_user_for_valid_token(db_session):
    existing_user = (db_session.query(User).filter(User.email=="test@example.com").first())
    token = create_access_token(user_id=existing_user.id)
    current_user = get_current_user(access_token=token, db=db_session)
    assert current_user.id == existing_user.id
    assert current_user.email == "test@example.com"
    assert current_user.username == "test-user"

def test_get_current_user_rejects_invalid_token(db_session):
    with pytest.raises(HTTPException) as exception_info:
        get_current_user(access_token="this-is-not-a-valid-token", db = db_session)
    assert exception_info.value.status_code == status.HTTP_401_UNAUTHORIZED
    assert exception_info.value.detail == "Not authenticated"

def test_get_current_user_rejects_token_for_missing_user(db_session):
    token = create_access_token(user_id=10000)
    with pytest.raises(HTTPException) as exception_info:
        get_current_user(access_token=token, db=db_session)
    assert exception_info.value.status_code == status.HTTP_401_UNAUTHORIZED
    assert exception_info.value.detail == "Not authenticated"
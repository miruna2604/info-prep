import pytest
from pydantic import ValidationError
from datetime import datetime
from types import SimpleNamespace

from app.models.auth import LoginRequest, RegisterRequest, UserResponse

def test_register_request_accepts_valid_data():
    request = RegisterRequest(username="miruna", email="miruna@example.com", password="parola123")
    assert request.username == "miruna"
    assert str(request.email) == "miruna@example.com"
    assert request.password.get_secret_value() == "parola123"
    assert "parola123" not in repr(request)

def test_register_request_rejects_invalid_email():
    with pytest.raises(ValidationError):
        RegisterRequest(username="miruna", email="nu-este-email", password="parola123")

def test_register_request_rejects_short_password():
    with pytest.raises(ValidationError):
        RegisterRequest(username="miruna", email="miruna@example.com", password="1234567")

def test_register_request_rejects_short_username():
    with pytest.raises(ValidationError):
        RegisterRequest(username="mi", email="miruna@example.com", password="parola123")

def test_login_request_accepts_valid_credentials():
    request = LoginRequest(email="miruna@example.com", password="parola123")
    assert str(request.email) == "miruna@example.com"
    assert request.password.get_secret_value() == "parola123"
    assert "parola123" not in repr(request)

def test_user_response_exposes_only_public_fields():
    created_at = datetime(2026, 9, 2, 12, 30)
    database_user = SimpleNamespace(id=1, username="miruna", email="miruna@example.com", password_hash="hash-secret-care-nu-trb-expus", created_at=created_at)
    response = UserResponse.model_validate(database_user) # :UserResponse
    response_data = response.model_dump() #model pydantic > dictionary
    assert response_data == {
        "id": 1,
        "username": "miruna",
        "email": "miruna@example.com",
        "created_at": created_at,
    }
    assert "password_hash" not in response_data
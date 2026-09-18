from fastapi import status

from app.database.schemas.user import User
from app.services.auth_service import verify_password

def test_register_returns_created_user(client):
    response = client.post("/auth/register", json={"username": "new-user", "email": "New.User@Example.COM", "password": "parola123"})
    response_data = response.json()
    assert response.status_code == status.HTTP_201_CREATED
    assert response_data["id"] is not None
    assert response_data["username"] == "new-user"
    assert response_data["email"] == "new.user@example.com"
    assert "created_at" in response_data
    assert "password" not in response_data
    assert "password_hash" not in response_data

def test_register_saves_user_with_hashed_password(client, db_session):
    response = client.post("/auth/register", json={"username": "database-user", "email": "database.user@example.COM", "password": "parola123"})
    saved_user = (db_session.query(User).filter(User.email == "database.user@example.com").first())
    assert response.status_code == status.HTTP_201_CREATED
    assert saved_user is not None
    assert saved_user.username == "database-user"
    assert saved_user.password_hash != "parola123"
    assert saved_user.password_hash.startswith("$argon2")
    assert verify_password("parola123", saved_user.password_hash)

def test_register_rejects_duplicate_email(client):
    response = client.post("/auth/register", json={"username": "another-user", "email": "TEST@example.COM", "password": "parola123"})
    response_data = response.json()
    assert response.status_code == status.HTTP_409_CONFLICT
    assert response_data["detail"] == "Email is already registered"

def test_register_rejects_duplicate_username(client):
    response = client.post("/auth/register", json={"username": "test-user", "email": "different@example.COM", "password": "parola123"})
    response_data = response.json()
    assert response.status_code == status.HTTP_409_CONFLICT
    assert response_data["detail"] == "Username is already registered"

def test_register_rejects_invalid_email(client):
    response = client.post("/auth/register", json={"username": "valid-user", "email": "not-an-email", "password": "parola123"})
    response_data = response.json()
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_CONTENT
    assert response_data["detail"] is not None

def test_register_rejects_short_password(client):
    response = client.post("/auth/register", json={"username": "valid-user", "email": "valid@example.com", "password": "short"})
    response_data = response.json()
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_CONTENT
    assert response_data["detail"] is not None

def test_login_returns_user_and_sets_access_token_cookie(client):
    response = client.post("/auth/login", json={"email": "TEST@EXAMPLE.COM", "password": "test-password"})
    response_data = response.json()
    access_token = client.cookies.get("access_token")
    assert response.status_code == status.HTTP_200_OK
    assert response_data["username"] == "test-user"
    assert response_data["email"] == "test@example.com"
    assert "password" not in response_data
    assert "password_hash" not in response_data
    assert access_token is not None

def test_login_rejects_incorrect_credentials(client):
    response = client.post("/auth/login", json={"email": "test@example.COM", "password": "wrong-password"})
    response_data = response.json()
    access_token = client.cookies.get("access_token")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response_data["detail"] == "Incorrect email or password"
    assert access_token is None

def test_get_me_returns_authenticated_user(client):
    login_response = client.post("/auth/login", json={"email": "test@example.COM", "password": "test-password"})
    me_response = client.get("/auth/me")
    response_data = me_response.json()
    assert login_response.status_code == status.HTTP_200_OK
    assert me_response.status_code == status.HTTP_200_OK
    assert response_data["username"] == "test-user"
    assert response_data["email"] == "test@example.com"
    assert "password" not in response_data
    assert "password_hash" not in response_data

def test_get_me_rejects_unauthenticated_user(client):
    response = client.get("/auth/me")
    response_data = response.json()
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response_data["detail"] == "Not authenticated"

def test_logout_deletes_access_token_cookie(client):
    login_response = client.post("/auth/login", json={"email": "test@example.com", "password": "test-password"})
    assert login_response.status_code == status.HTTP_200_OK
    assert client.cookies.get("access_token") is not None
    logout_response = client.post("/auth/logout")
    assert logout_response.status_code == status.HTTP_204_NO_CONTENT
    assert logout_response.content == b""
    assert client.cookies.get("access_token") is None
    me_response = client.get("/auth/me")
    assert me_response.status_code == status.HTTP_401_UNAUTHORIZED
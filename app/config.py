import os

from dotenv import load_dotenv

load_dotenv()

def get_positive_int(name: str, default: int) -> int:
    raw_value = os.getenv(name)
    if raw_value is None:
        return default
    try:
        value = int(raw_value)
    except ValueError as error:
        raise RuntimeError(f"{name} must be an integer") from error
    if value <= 0:
        raise RuntimeError(f"{name} must be greater than zero")
    return value

auth_secret_key = os.getenv("AUTH_SECRET_KEY")
if not auth_secret_key:
    raise RuntimeError("AUTH_SECRET_KEY is not configured")
if len(auth_secret_key) < 32:
    raise RuntimeError("AUTH_SECRET_KEY must contain at least 32 characters")

AUTH_SECRET_KEY = auth_secret_key
AUTH_ALGORITHM = "HS256"
AUTH_TOKEN_EXPIRE_MINUTES = get_positive_int("AUTH_TOKEN_EXPIRE_MINUTES", default=30)

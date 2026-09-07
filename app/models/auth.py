from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field, SecretStr

#username, email, passoword
class RegisterRequest(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: SecretStr = Field(min_length=8, max_length=128)

class LoginRequest(BaseModel):
    email: EmailStr
    password: SecretStr = Field(min_length=8, max_length=128)

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str
    email: EmailStr
    created_at: datetime
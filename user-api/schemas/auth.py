from pydantic import BaseModel
from typing import Union


class UserBase(BaseModel):
    email: str


class User(UserBase):
    id: int
    name: Union[str, None] = None
    disabled: Union[bool, None] = None

    class Config:
        from_attributes = True


class UserInDB(User):
    hashed_password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(LoginRequest):
    name: str

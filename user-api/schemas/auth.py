from pydantic import BaseModel
from typing import Literal, Union


class UserBase(BaseModel):
    email: str


class User(UserBase):
    id: int
    name: str
    disabled: Union[bool, None] = None
    role: str

    class Config:
        from_attributes = True


class UserInDB(User):
    hashed_password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(LoginRequest):
    name: str
    role: Literal["Admin", "User"]
    admin_key: Union[str, None] = None


class UpdateUserRequest(BaseModel):
    id: int
    email: Union[str, None] = None
    password: Union[str, None] = None
    name: Union[str, None] = None
import re
import os
from typing import Literal, Union
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from models import UserModel
from database import get_db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ADMIN_KEY = os.getenv("ADMIN_KEY")


class UserService:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db

    def get_user(self, email: str):
        return self.db.query(UserModel).filter(UserModel.email == email).first()

    def get_user_by_id(self, id: int):
        return self.db.query(UserModel).filter(UserModel.id == id).first()
    
    def authorize_user(self, email: str, password: str):
        user = self.get_user(email=email)
        if not user:
            raise HTTPException(
                status_code=401, detail="Invalid email")
        elif not pwd_context.verify(password, user.hashed_password):
            raise HTTPException(
                status_code=401, detail="Invalid password")
        return user

    def add_user(self, email: str, password: str, name: str, role: Literal["Admin", "User"], admin_key: Union[str, None] = None):
        existing_user = self.get_user(email=email)
        if existing_user:
            raise HTTPException(
                status_code=401, detail="Email already registered")
        if not is_valid_email(email):
                raise HTTPException(
                    status_code=401, detail="Invalid email")
        if role == "Admin" and admin_key != ADMIN_KEY:
            raise HTTPException(
                status_code=401, detail="Invalid admin key")
        hashed_password = pwd_context.hash(password)
        user = UserModel(
            email=email, hashed_password=hashed_password, name=name, role=role)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
    
    def update_user(self, id: int, email: Union[str, None], password: Union[str, None], name: Union[str, None]):
        print(id, email, password, name)
        existing_user = self.get_user_by_id(id=id)
        if not existing_user:
            raise HTTPException(
                status_code=401, detail="User does not exist")        
        if email:
            if not is_valid_email(email):
                raise HTTPException(
                    status_code=401, detail="Invalid email")
            existing_user.email = email
        if password:
            existing_user.hashed_password = pwd_context.hash(password)
        if name:
            existing_user.name = name
        self.db.commit()
        self.db.refresh(existing_user)
        return existing_user

def is_valid_email(email):
    regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(regex, email) is not None
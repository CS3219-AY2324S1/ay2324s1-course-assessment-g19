from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from models import UserModel
from database import get_db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserService:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db

    def get_user(self, email: str):
        return self.db.query(UserModel).filter(UserModel.email == email).first()

    def authorize_user(self, email: str, password: str):
        user = self.get_user(email=email)
        if not user:
            raise HTTPException(
                status_code=401, detail="Invalid email")
        elif not pwd_context.verify(password, user.hashed_password):
            raise HTTPException(
                status_code=401, detail="Invalid password")
        return user

    def add_user(self, email: str, password: str, name: str):
        existing_user = self.get_user(email=email)
        if existing_user:
            raise HTTPException(
                status_code=401, detail="Email already registered")
        hashed_password = pwd_context.hash(password)
        user = UserModel(
            email=email, hashed_password=hashed_password, name=name)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

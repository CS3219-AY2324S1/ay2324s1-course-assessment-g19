# all postgres tables are defined here

from sqlalchemy import Column, String
from database import Base


class Users(Base):
    __tablename__ = 'users'

    username = Column(String, primary_key=True, index=True)
    password = Column(String, index=True)

# class UserHistory(Base):
#     __tablename__ = 'userHistory'
#
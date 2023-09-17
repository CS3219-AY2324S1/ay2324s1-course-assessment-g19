from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware


origins = [
    "http://localhost:5173",
]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['GET', 'POST', '*'],
        allow_headers=['*'],
    )
]

app = FastAPI(middleware=middleware)
models.Base.metadata.create_all(bind=engine)


class UserBase(BaseModel):
    username: str
    password: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.get("/users/{username}")
async def get_user(username: str, db: db_dependency):
    result = db.query(models.Users).filter(models.Users.username == username).first()
    if not result:
        raise HTTPException(status_code=404, detail='no such user')
    return result

@app.post("/users/")
async def create_user(user: UserBase, db: db_dependency):
    db_user = models.Users(username=user.username, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/users/{username}")
async def delete_user(username: str, db: db_dependency):
    user = db.query(models.Users).filter(models.Users.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail='no such user')
    db.delete(user)
    db.commit()
    return {"message": f"User {username} has been deleted"}

@app.put("/change-user/{username}/{new_username}")
async def update_user(username: str, new_username: str, db: db_dependency):
    user = db.query(models.Users).filter(models.Users.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail='no such user')
    user.username = new_username
    db.commit()
    return {"message": f"Username updated to {new_username}"}


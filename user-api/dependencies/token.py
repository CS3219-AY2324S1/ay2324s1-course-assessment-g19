import os
from datetime import timedelta, datetime

from dotenv import load_dotenv
from fastapi import Depends, HTTPException, Request, Response
from jose import jwt

from services import UserService

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(response: Response, email: str, hashed_password: str):
    exp = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"email": email,
                 "hashed_password": hashed_password,
                 "exp": datetime.utcnow() + exp}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    response.set_cookie(key="access_token",
                        value=encoded_jwt,
                        httponly=True,
                        max_age=exp.total_seconds())
    return encoded_jwt


def validate_access_token(request: Request, response: Response, svc: UserService = Depends()):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="TOKEN NOT FOUND")
    try:
        decoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except:
        raise HTTPException(status_code=401, detail="TOKEN INVALID")
    email = decoded_jwt.get("email")
    current_user = svc.get_user(email=email)
    if not current_user:
        raise HTTPException(status_code=401, detail="TOKEN MISMATCH")
    create_access_token(response=response,
                        email=current_user.email,
                        hashed_password=current_user.hashed_password)
    return current_user

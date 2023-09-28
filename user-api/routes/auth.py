from fastapi import APIRouter, Depends, Response

from dependencies import validate_access_token, create_access_token
from schemas import RegisterRequest, LoginRequest, User
from services import UserService


router = APIRouter()


@router.get("/token", response_model=User)
async def authorize_user(current_user: User = Depends(validate_access_token)):
    return current_user


@router.post("/register", response_model=User)
async def register_user(request: RegisterRequest, response: Response, svc: UserService = Depends()):
    current_user = svc.add_user(
        name=request.name, email=request.email, password=request.password)
    create_access_token(response=response,
                        email=current_user.email,
                        hashed_password=current_user.hashed_password)
    return current_user


@router.post("/login", response_model=User)
async def login_user(request: LoginRequest, response: Response, svc: UserService = Depends()):
    current_user = svc.authorize_user(email=request.email,
                                      password=request.password)
    create_access_token(response=response,
                        email=current_user.email,
                        hashed_password=current_user.hashed_password)
    return current_user


@router.post("/logout")
async def logout_user(response: Response):
    response.delete_cookie("access_token")
    return None

from fastapi import APIRouter, Depends

from schemas import User
from services import UserService


router = APIRouter()

@router.get("/", response_model=User)
async def get_user(email: str, svc: UserService = Depends()):
    return svc.get_user(email=email)
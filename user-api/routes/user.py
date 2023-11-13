from fastapi import APIRouter, Depends

from schemas import User, UpdateUserRequest
from services import UserService


router = APIRouter()

@router.get("/", response_model=User)
async def get_user(email: str, svc: UserService = Depends()):
    return svc.get_user(email=email)

@router.put("/", response_model=User)
async def update_user(request: UpdateUserRequest, svc: UserService = Depends()):
    return svc.update_user(id=request.id ,email=request.email, password=request.password, name=request.name)

@router.delete("/{id}")
async def delete_user(id: int, svc: UserService = Depends()):
    return svc.delete_user(id=id)
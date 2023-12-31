from fastapi import FastAPI
from routes import auth, collaboration, user

from models import Base
from database import engine


Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
async def root():
    return "from User API!"

app.include_router(auth.router, prefix="/auth", tags=['auth'])
app.include_router(collaboration.router, prefix="/collaboration", tags=['collaboration'])
app.include_router(user.router, prefix="/user", tags=['user'])

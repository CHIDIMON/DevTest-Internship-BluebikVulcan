#main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from database import create_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db()  # call for function create_db and load data
    yield

app = FastAPI(lifespan=lifespan) #create database for 1 time

@app.get("/")
def read_root():
    return {"message": "Backend API is ready"}
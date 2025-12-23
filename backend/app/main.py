#main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Query
from database import create_db, get_session

from typing import List
from sqlmodel import Session, select
from schemas import Transaction

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db()  # call for function create_db and load data
    yield

app = FastAPI(lifespan=lifespan) #create database for 1 time

@app.get("/")
def read_root():
    return {"message": "Backend API is ready"}

@app.get("/transactions", response_model=List[Transaction])
def get_transactions(
    session: Session = Depends(get_session),
    skip: int = 0, 
    limit: int = Query(default=100, le=100) # Default 100, Max 100 items
):
    statement = select(Transaction).offset(skip).limit(limit)
    results = session.exec(statement).all()
    return results
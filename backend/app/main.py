#main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Query, HTTPException
from database import create_db, get_session

from typing import List , Optional
from sqlmodel import Session, select, col
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
    page: int = Query(1, ge=1, description="Page number (starts at 1)"),
    limit: int = Query(default=10, ge=1, le=100, description="Items per page (10-100)"),
    search: Optional[str] = Query(None, description="Search by customer name"),
    status: Optional[str] = Query(None, description="Filter by status (Completed, Pending, Failed)"),
    sort_by: str = Query("date", description="Sort by field (date, amount)"),
    order: str = Query("desc", description="Sort order (asc, desc)")
):
    statement = select(Transaction)

    if search:
        statement = statement.where(col(Transaction.customer_name).contains(search))
    
    #Filter Logic
    if status and status.lower() != "all":
        statement = statement.where(Transaction.status == status)

    #Sorting Logic
    if hasattr(Transaction, sort_by):
        sort_column = getattr(Transaction, sort_by)
        if order.lower() == "asc":
            statement = statement.order_by(sort_column.asc())
        else:
            statement = statement.order_by(sort_column.desc())
    
    #Pagination Logic (Convert Page To Offset)
    offset = (page - 1) * limit
    statement = statement.offset(offset).limit(limit)

    results = session.exec(statement).all()
    return results

@app.get("/transactions/{transaction_id}", response_model=Transaction)
def get_transaction_detail(transaction_id: str, session: Session = Depends(get_session)):
    item = session.get(Transaction, transaction_id)
    if not item:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return item
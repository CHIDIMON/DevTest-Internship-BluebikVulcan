#schemas.py
from sqlmodel import SQLModel, Field

#Table Structure and Setup
class Transaction(SQLModel,table=True):
    id: str = Field(primary_key=True)
    date: str
    type: str = Field(default=None) 
    amount:float
    customer_name: str
    status: str
    description: str = Field(default=None)
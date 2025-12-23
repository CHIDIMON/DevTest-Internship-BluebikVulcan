#database.py
import json
from pathlib import Path
from sqlmodel import SQLModel, create_engine, Session, select
from schemas import Transaction

#Setup Path
BASE_DIR = Path(__file__).parent.parent #IntoRootDirectory 
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True) #Create Data Folder If Doesnt Have Yet

engine = create_engine(f"sqlite:///{DATA_DIR / 'database.db'}", connect_args={"check_same_thread": False}) #Disable same thread for Asynchronous


def create_db():
    SQLModel.metadata.create_all(engine)
    
    with Session(engine) as session:

        if not session.exec(select(Transaction)).first(): #Checking Stock If doesnt Have it Will Create
            print("Seeding data")
            
        
            json_str = (DATA_DIR / "transactions.json").read_text(encoding="utf-8") #Path of Data
            transactions = [Transaction.model_validate(item) for item in json.loads(json_str)]
            
            session.add_all(transactions) #add all data from transaction
            session.commit()
            print(f"Loaded {len(transactions)} items")

def get_session():
    with Session(engine) as session:
        yield session #yield for Hand over session and auto close after request
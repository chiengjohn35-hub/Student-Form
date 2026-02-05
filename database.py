from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

#create the database url
SQLALCHEMY_DATABSE_URL = "sqlite:///./work2.db"

#create the databse engine
engine = create_engine(SQLALCHEMY_DATABSE_URL, connect_args={"check_same_thread":False})

#create sessionLocal class for database seesions
SessionLocal = sessionmaker(autoflush=False, autocommit=False,bind=engine)

#create a base url for our models
Base = declarative_base()
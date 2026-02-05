from sqlalchemy import Integer, Column, String
from database import Base


class Students(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer, index=True)
    sex = Column(String, index=True)

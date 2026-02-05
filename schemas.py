from pydantic import BaseModel

class StudentsBase(BaseModel):
    name: str
    age: int
    sex: str

class StudentCreate(StudentsBase):
    pass

class Student(StudentsBase):
    id: int

    class Config:
        orm_mode = True

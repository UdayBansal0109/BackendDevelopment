# ==========================================
# Lecture 5 - Lab Exercise: Course resource with FastAPI
# Run:  pip install -r requirements.txt
#       uvicorn main:app --reload      →  http://127.0.0.1:8000/docs  and  /redoc
# ==========================================

from typing import List, Optional

from fastapi import FastAPI, HTTPException, Query, status
from pydantic import BaseModel, Field

app = FastAPI(
    title="Course Management API",
    version="1.0.0",
    description="Lecture 5 lab exercise: CRUD operations on a Course resource.",
)


# ---------- Pydantic models ----------
class CourseCreate(BaseModel):
    """Data the client sends when creating or replacing a course."""
    title: str = Field(..., min_length=3, examples=["Backend Development"])
    credits: int = Field(..., ge=1, le=6, examples=[4])
    department: str = Field(..., examples=["CSE"])


class Course(CourseCreate):
    """Course returned by the API (includes the id)."""
    id: int


# ---------- In-memory "database" ----------
courses: List[Course] = [
    Course(id=1, title="Backend Development", credits=4, department="CSE"),
    Course(id=2, title="Digital Electronics", credits=3, department="ECE"),
    Course(id=3, title="Database Management Systems", credits=4, department="CSE"),
    Course(id=4, title="Web Technologies", credits=3, department="IT"),
]


def find_course(course_id: int) -> Course:
    for course in courses:
        if course.id == course_id:
            return course
    raise HTTPException(status_code=404, detail="Course not found")


# ---------- Routes ----------
@app.get("/")
def root():
    return {"message": "Course Management API", "docs": "/docs", "redoc": "/redoc"}


# GET all  (+ Lab Exercise 5: optional ?department=CSE filter)
@app.get("/courses", response_model=List[Course])
def get_courses(department: Optional[str] = Query(None, description="Filter by department, e.g. CSE")):
    if department:
        return [c for c in courses if c.department.lower() == department.lower()]
    return courses


# GET by id
@app.get("/courses/{course_id}", response_model=Course)
def get_course(course_id: int):
    return find_course(course_id)


# POST - create
@app.post("/courses", response_model=Course, status_code=status.HTTP_201_CREATED)
def create_course(data: CourseCreate):
    new_id = max((c.id for c in courses), default=0) + 1
    course = Course(id=new_id, **data.model_dump())
    courses.append(course)
    return course


# PUT - replace
@app.put("/courses/{course_id}", response_model=Course)
def update_course(course_id: int, data: CourseCreate):
    course = find_course(course_id)
    updated = Course(id=course.id, **data.model_dump())
    courses[courses.index(course)] = updated
    return updated


# DELETE
@app.delete("/courses/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int):
    course = find_course(course_id)
    courses.remove(course)

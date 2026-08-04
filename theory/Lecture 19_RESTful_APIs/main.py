# ==========================================
# Lecture 19 - Implementing RESTful APIs: Student Management API
# Run:  pip install -r requirements.txt
#       uvicorn main:app --reload     →  http://127.0.0.1:8000/docs
# ==========================================

import math
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, Query, Response, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

import models
import schemas
from database import Base, engine, get_db

# Create tables if they do not exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Student Management API",
    version="1.0.0",
    description="Lecture 19 lab exercise: CRUD, filtering, pagination, courses and nested enrollments.",
)

ERRORS = {404: {"model": schemas.ErrorResponse}, 409: {"model": schemas.ErrorResponse}}


def get_student_or_404(db: Session, student_id: int) -> models.Student:
    student = db.get(models.Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student with id {student_id} not found")
    return student


def check_department(db: Session, department_id: Optional[int]):
    if department_id is not None and not db.get(models.Department, department_id):
        raise HTTPException(status_code=404, detail=f"Department with id {department_id} not found")


# ==================== DEPARTMENTS ====================
@app.post("/departments", response_model=schemas.DepartmentResponse, status_code=201, tags=["Departments"], responses=ERRORS)
def create_department(data: schemas.DepartmentCreate, db: Session = Depends(get_db)):
    if db.query(models.Department).filter(models.Department.name == data.name).first():
        raise HTTPException(status_code=409, detail="Department already exists")
    department = models.Department(name=data.name)
    db.add(department)
    db.commit()
    db.refresh(department)
    return department


@app.get("/departments", response_model=List[schemas.DepartmentResponse], tags=["Departments"])
def list_departments(db: Session = Depends(get_db)):
    return db.query(models.Department).all()


# ==================== STUDENTS ====================
@app.get("/students", response_model=schemas.StudentListResponse, tags=["Students"])
def list_students(
    branch: Optional[schemas.BranchEnum] = None,
    department_id: Optional[int] = None,
    search: Optional[str] = Query(None, description="Search in name or email"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(models.Student)

    # Lab Exercise 2: filtering
    if branch:
        query = query.filter(models.Student.branch == branch.value)
    if department_id:
        query = query.filter(models.Student.department_id == department_id)
    if search:
        pattern = f"%{search}%"
        query = query.filter(or_(models.Student.name.ilike(pattern), models.Student.email.ilike(pattern)))

    # Lab Exercise 3: pagination with metadata
    total = query.count()
    students = query.order_by(models.Student.id).offset((page - 1) * limit).limit(limit).all()

    return {
        "data": students,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": math.ceil(total / limit) if total else 0,
    }


@app.get("/students/{student_id}", response_model=schemas.StudentResponse, tags=["Students"], responses=ERRORS)
def get_student(student_id: int, db: Session = Depends(get_db)):
    return get_student_or_404(db, student_id)


@app.post("/students", response_model=schemas.StudentResponse, status_code=201, tags=["Students"], responses=ERRORS)
def create_student(data: schemas.StudentCreate, db: Session = Depends(get_db)):
    # 409 Conflict when the email is already used
    if db.query(models.Student).filter(models.Student.email == data.email).first():
        raise HTTPException(status_code=409, detail="Email already registered")
    check_department(db, data.department_id)

    student = models.Student(**data.model_dump(mode="python"))
    student.branch = data.branch.value
    db.add(student)
    db.commit()
    db.refresh(student)
    return student


@app.put("/students/{student_id}", response_model=schemas.StudentResponse, tags=["Students"], responses=ERRORS)
def replace_student(student_id: int, data: schemas.StudentCreate, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)

    duplicate = db.query(models.Student).filter(models.Student.email == data.email, models.Student.id != student_id).first()
    if duplicate:
        raise HTTPException(status_code=409, detail="Email already registered")
    check_department(db, data.department_id)

    for field, value in data.model_dump().items():
        setattr(student, field, value.value if isinstance(value, schemas.BranchEnum) else value)
    db.commit()
    db.refresh(student)
    return student


@app.patch("/students/{student_id}", response_model=schemas.StudentResponse, tags=["Students"], responses=ERRORS)
def update_student(student_id: int, data: schemas.StudentUpdate, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    changes = data.model_dump(exclude_unset=True)

    if "email" in changes:
        duplicate = db.query(models.Student).filter(models.Student.email == changes["email"], models.Student.id != student_id).first()
        if duplicate:
            raise HTTPException(status_code=409, detail="Email already registered")
    if "department_id" in changes:
        check_department(db, changes["department_id"])

    for field, value in changes.items():
        setattr(student, field, value.value if isinstance(value, schemas.BranchEnum) else value)
    db.commit()
    db.refresh(student)
    return student


@app.delete("/students/{student_id}", status_code=204, tags=["Students"], responses=ERRORS)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    db.delete(student)
    db.commit()
    return Response(status_code=204)


# ==================== COURSES ====================
@app.post("/courses", response_model=schemas.CourseResponse, status_code=201, tags=["Courses"], responses=ERRORS)
def create_course(data: schemas.CourseCreate, db: Session = Depends(get_db)):
    if db.get(models.Course, data.id):
        raise HTTPException(status_code=409, detail=f"Course {data.id} already exists")
    check_department(db, data.department_id)

    course = models.Course(**data.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@app.get("/courses", response_model=List[schemas.CourseResponse], tags=["Courses"])
def list_courses(db: Session = Depends(get_db)):
    return db.query(models.Course).all()


# ==================== ENROLLMENTS (nested resource) ====================
@app.get("/students/{student_id}/enrollments", response_model=List[schemas.EnrollmentResponse], tags=["Enrollments"], responses=ERRORS)
def list_enrollments(student_id: int, db: Session = Depends(get_db)):
    student = get_student_or_404(db, student_id)
    return student.enrollments


@app.post("/students/{student_id}/enrollments", response_model=schemas.EnrollmentResponse, status_code=201, tags=["Enrollments"], responses=ERRORS)
def enroll_student(student_id: int, data: schemas.EnrollmentCreate, db: Session = Depends(get_db)):
    get_student_or_404(db, student_id)

    if not db.get(models.Course, data.course_id):
        raise HTTPException(status_code=404, detail=f"Course {data.course_id} not found")
    if db.get(models.Enrollment, (student_id, data.course_id)):
        raise HTTPException(status_code=409, detail="Student is already enrolled in this course")

    enrollment = models.Enrollment(student_id=student_id, **data.model_dump())
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return enrollment


@app.delete("/students/{student_id}/enrollments/{course_id}", status_code=204, tags=["Enrollments"], responses=ERRORS)
def drop_enrollment(student_id: int, course_id: str, db: Session = Depends(get_db)):
    enrollment = db.get(models.Enrollment, (student_id, course_id))
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    db.delete(enrollment)
    db.commit()
    return Response(status_code=204)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", reload=True)

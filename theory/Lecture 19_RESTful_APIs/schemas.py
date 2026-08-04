from datetime import date, datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class BranchEnum(str, Enum):
    CSE = "CSE"
    ECE = "ECE"
    IT = "IT"
    ME = "ME"


# ---------- Department ----------
class DepartmentCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)


class DepartmentResponse(DepartmentCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Student ----------
class StudentBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    branch: BranchEnum


class StudentCreate(StudentBase):
    department_id: Optional[int] = None
    enrollment_date: Optional[date] = None


class StudentUpdate(BaseModel):
    """All fields optional - used by PATCH."""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    branch: Optional[BranchEnum] = None
    department_id: Optional[int] = None


class StudentResponse(StudentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    enrollment_date: Optional[date]
    department_id: Optional[int]
    created_at: datetime
    updated_at: Optional[datetime]


class StudentListResponse(BaseModel):
    data: List[StudentResponse]
    total: int
    page: int
    limit: int
    total_pages: int


# ---------- Course ----------
class CourseBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    credits: int = Field(..., ge=1, le=6)


class CourseCreate(CourseBase):
    id: str = Field(..., min_length=2, max_length=10, examples=["CS301"])
    department_id: Optional[int] = None


class CourseResponse(CourseBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    department_id: Optional[int]
    created_at: datetime


# ---------- Enrollment ----------
class EnrollmentCreate(BaseModel):
    course_id: str
    semester: str = Field(..., examples=["2026-ODD"])
    grade: Optional[str] = Field(None, max_length=2)


class EnrollmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    student_id: int
    course_id: str
    semester: str
    grade: Optional[str]
    enrolled_at: datetime


class ErrorResponse(BaseModel):
    detail: str

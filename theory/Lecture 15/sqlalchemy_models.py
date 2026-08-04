# ==========================================
# Lecture 15 - Lab Exercise 2: SQLAlchemy models for the Student Management System
# ==========================================

from sqlalchemy import CheckConstraint, Column, Date, ForeignKey, Integer, String, create_engine, event
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

Base = declarative_base()


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)

    # one department → many students
    students = relationship("Student", back_populates="department")


class Student(Base):
    __tablename__ = "students"
    __table_args__ = (CheckConstraint("branch IN ('CSE', 'ECE', 'IT', 'ME')", name="valid_branch"),)

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    branch = Column(String(10), nullable=False)
    enrollment_date = Column(Date)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)

    department = relationship("Department", back_populates="students")
    # cascade: deleting a student also deletes the student's enrollments
    enrollments = relationship("Enrollment", back_populates="student", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Student {self.id} {self.name} ({self.branch})>"


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True)
    code = Column(String(10), unique=True, nullable=False)
    title = Column(String(100), nullable=False)
    credits = Column(Integer, CheckConstraint("credits BETWEEN 1 AND 6"), nullable=False)

    enrollments = relationship("Enrollment", back_populates="course")


class Enrollment(Base):
    """Association between Student and Course (many-to-many) with extra data."""
    __tablename__ = "enrollments"

    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), primary_key=True)
    course_id = Column(Integer, ForeignKey("courses.id"), primary_key=True)
    grade = Column(String(2))

    student = relationship("Student", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


def get_session(url="sqlite:///:memory:"):
    engine = create_engine(url)

    # SQLite enforces foreign keys only when this pragma is on
    @event.listens_for(engine, "connect")
    def enable_foreign_keys(dbapi_connection, _):
        dbapi_connection.execute("PRAGMA foreign_keys=ON")

    Base.metadata.create_all(engine)
    return sessionmaker(bind=engine)()

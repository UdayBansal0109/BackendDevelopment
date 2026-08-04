# Automated tests for the Student Management API.  Run:  pytest -v
# A separate in-memory SQLite database is used, so students.db is never touched.
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from database import Base, get_db
from main import app

test_engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
TestingSession = sessionmaker(bind=test_engine, autocommit=False, autoflush=False)


def override_get_db():
    db = TestingSession()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


@pytest.fixture(autouse=True)
def fresh_database():
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)


def make_student(name="Aarav", email="aarav@example.com", branch="CSE", **extra):
    return client.post("/students", json={"name": name, "email": email, "branch": branch, **extra})


def test_create_and_get_student():
    response = make_student()
    assert response.status_code == 201
    student_id = response.json()["id"]
    assert client.get(f"/students/{student_id}").json()["email"] == "aarav@example.com"


def test_404_for_missing_student():
    response = client.get("/students/999")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"]


def test_409_for_duplicate_email():
    make_student()
    response = make_student(name="Other")
    assert response.status_code == 409


def test_422_for_invalid_data():
    assert make_student(email="not-an-email").status_code == 422
    assert make_student(branch="ARTS").status_code == 422


def test_update_and_delete():
    student_id = make_student().json()["id"]

    patched = client.patch(f"/students/{student_id}", json={"branch": "IT"})
    assert patched.status_code == 200 and patched.json()["branch"] == "IT"

    replaced = client.put(f"/students/{student_id}", json={"name": "Aarav S", "email": "a2@example.com", "branch": "ECE"})
    assert replaced.json()["name"] == "Aarav S"

    assert client.delete(f"/students/{student_id}").status_code == 204
    assert client.get(f"/students/{student_id}").status_code == 404


def test_filter_search_and_pagination():
    dept = client.post("/departments", json={"name": "Computer Science"}).json()["id"]
    for i in range(12):
        make_student(name=f"Student {i}", email=f"s{i}@example.com", branch="CSE" if i % 2 == 0 else "IT", department_id=dept)
    make_student(name="Diya", email="diya@example.com", branch="ECE")

    page1 = client.get("/students", params={"page": 1, "limit": 5}).json()
    assert page1["total"] == 13 and page1["total_pages"] == 3 and len(page1["data"]) == 5

    assert client.get("/students", params={"branch": "CSE"}).json()["total"] == 6
    assert client.get("/students", params={"department_id": dept}).json()["total"] == 12
    assert client.get("/students", params={"search": "diya"}).json()["total"] == 1


def test_courses_and_nested_enrollments():
    created = client.post("/courses", json={"id": "CS301", "title": "Backend Development", "credits": 4})
    assert created.status_code == 201
    assert client.post("/courses", json={"id": "CS301", "title": "Dup", "credits": 4}).status_code == 409
    assert client.post("/courses", json={"id": "CS999", "title": "Bad", "credits": 9}).status_code == 422

    student_id = make_student().json()["id"]
    enrolled = client.post(f"/students/{student_id}/enrollments", json={"course_id": "CS301", "semester": "2026-ODD"})
    assert enrolled.status_code == 201
    assert client.post(f"/students/{student_id}/enrollments", json={"course_id": "CS301", "semester": "2026-ODD"}).status_code == 409
    assert client.post(f"/students/{student_id}/enrollments", json={"course_id": "XX1", "semester": "2026-ODD"}).status_code == 404
    assert len(client.get(f"/students/{student_id}/enrollments").json()) == 1

    assert client.delete(f"/students/{student_id}/enrollments/CS301").status_code == 204
    assert client.get(f"/students/{student_id}/enrollments").json() == []


def test_docs_available():
    assert client.get("/docs").status_code == 200

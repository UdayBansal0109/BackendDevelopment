# Tests for the Course API.  Run:  pytest -v
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_get_all_courses():
    response = client.get("/courses")
    assert response.status_code == 200
    assert len(response.json()) >= 4


def test_filter_by_department():
    response = client.get("/courses", params={"department": "CSE"})
    assert response.status_code == 200
    assert all(c["department"] == "CSE" for c in response.json())
    assert len(response.json()) == 2


def test_get_one_course_and_404():
    assert client.get("/courses/1").json()["title"] == "Backend Development"
    assert client.get("/courses/999").status_code == 404


def test_create_update_delete():
    created = client.post("/courses", json={"title": "Cloud Computing", "credits": 3, "department": "CSE"})
    assert created.status_code == 201
    course_id = created.json()["id"]

    updated = client.put(f"/courses/{course_id}", json={"title": "Cloud Computing Lab", "credits": 2, "department": "CSE"})
    assert updated.status_code == 200
    assert updated.json()["credits"] == 2

    assert client.delete(f"/courses/{course_id}").status_code == 204
    assert client.get(f"/courses/{course_id}").status_code == 404


def test_validation_error():
    response = client.post("/courses", json={"title": "AI", "credits": 10, "department": "CSE"})
    assert response.status_code == 422


def test_docs_are_generated():
    assert client.get("/docs").status_code == 200
    assert client.get("/redoc").status_code == 200
    assert "/courses/{course_id}" in client.get("/openapi.json").json()["paths"]

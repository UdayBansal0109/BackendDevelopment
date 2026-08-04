# ==========================================
# Lecture 3 - Flask part (Tasks 6 and 7) + Lab Exercise 4 (POST /students)
# Run:  python -m venv venv  →  venv\Scripts\activate  →  pip install -r requirements.txt
#       python app.py  →  http://localhost:5000
# ==========================================

from flask import Flask, jsonify, request

app = Flask(__name__)

students = [
    {"id": 1, "name": "Aarav", "branch": "CSE"},
    {"id": 2, "name": "Diya", "branch": "ECE"},
    {"id": 3, "name": "Rohan", "branch": "IT"},
]


# Task 6: hello world route
@app.route("/")
def home():
    return "Student Management API"


# Task 7: multiple routes returning JSON
@app.route("/students", methods=["GET"])
def get_students():
    return jsonify(students)


@app.route("/students/<int:student_id>")
def get_student(student_id):
    student = next((s for s in students if s["id"] == student_id), None)
    if student:
        return jsonify(student)
    return jsonify({"error": "Student not found"}), 404


# Lab Exercise 4: add a new student with POST
@app.route("/students", methods=["POST"])
def add_student():
    data = request.get_json(silent=True) or {}

    if not data.get("name") or not data.get("branch"):
        return jsonify({"error": "name and branch are required"}), 400

    new_student = {
        "id": max(s["id"] for s in students) + 1 if students else 1,
        "name": data["name"],
        "branch": data["branch"],
    }
    students.append(new_student)

    return jsonify(new_student), 201


if __name__ == "__main__":
    app.run(debug=True)

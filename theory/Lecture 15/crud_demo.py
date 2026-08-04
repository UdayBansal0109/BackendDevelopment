# ==========================================
# Lecture 15 - Lab Exercise 3: CRUD with SQLAlchemy
# Run:  python crud_demo.py      (uses an in-memory SQLite database)
# ==========================================

from datetime import date

from sqlalchemy.exc import IntegrityError

from sqlalchemy_models import Course, Department, Enrollment, Student, get_session

session = get_session()

# Sample departments and courses
cs = Department(name="Computer Science")
ec = Department(name="Electronics")
backend = Course(code="CS301", title="Backend Development", credits=4)
dbms = Course(code="CS302", title="DBMS", credits=4)
session.add_all([cs, ec, backend, dbms])
session.commit()

# ---------- CREATE: a new student with a department assignment ----------
aarav = Student(name="Aarav", email="aarav@example.com", branch="CSE",
                enrollment_date=date(2024, 8, 1), department=cs)
diya = Student(name="Diya", email="diya@example.com", branch="ECE", department=ec)
rohan = Student(name="Rohan", email="rohan@example.com", branch="CSE", department=cs)
session.add_all([aarav, diya, rohan])
session.commit()

session.add_all([
    Enrollment(student_id=aarav.id, course_id=backend.id, grade="A"),
    Enrollment(student_id=aarav.id, course_id=dbms.id),
])
session.commit()
print("Created:", session.query(Student).all())
print("Aarav's department:", aarav.department.name)

# ---------- READ: all students in a specific branch ----------
cse_students = session.query(Student).filter(Student.branch == "CSE").all()
print("\nCSE students:", [s.name for s in cse_students])

# ---------- UPDATE: change a student's branch ----------
diya.branch = "IT"
session.commit()
print("\nDiya's branch after update:", session.get(Student, diya.id).branch)

# ---------- DELETE: delete a student and verify cascade ----------
print("\nEnrollments before delete:", session.query(Enrollment).count())
session.delete(aarav)
session.commit()
print("Students after deleting Aarav:", [s.name for s in session.query(Student).all()])
print("Enrollments after delete (cascade):", session.query(Enrollment).count())

# ---------- Validation: constraints protect data integrity ----------
for bad in [
    Student(name="Dup", email="rohan@example.com", branch="CSE", department_id=cs.id),   # unique email
    Student(name="Bad", email="bad@example.com", branch="ARTS", department_id=cs.id),    # check constraint
]:
    session.add(bad)
    try:
        session.commit()
    except IntegrityError as error:
        session.rollback()
        print("Rejected by database:", str(error.orig))

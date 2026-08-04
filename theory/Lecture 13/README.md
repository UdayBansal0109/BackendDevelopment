# Lecture 13 — Introduction to Databases

**Unit 2:** Databases and RESTful APIs

---

## Objective

Compare relational (PostgreSQL) and document (MongoDB) databases by running the same queries on both.

## Technologies

PostgreSQL, MongoDB

---

This lecture's lab exercise is the same as optional Lab Experiment 14; its scripts are not included in this repository.

## Lab Exercise Requirements

| # | Requirement |
|:-:|---|
| 1 | Install PostgreSQL (preferred) or MySQL and create the database `student_management` |
| 2 | Create `students(id, name, branch, email, enrollment_date)` |
| 3 | Insert at least 5 records |
| 4 | Queries: CSE students, enrolled after Jan 2024, update a branch, delete a record |
| 5 | MongoDB `students` collection with at least 3 documents |
| 6 | Compare the SQL and MongoDB experience |

## Same Queries in SQL and MongoDB

| Task | PostgreSQL | MongoDB |
|---|---|---|
| CSE students | `SELECT * FROM students WHERE branch = 'CSE';` | `db.students.find({ branch: "CSE" })` |
| After Jan 2024 | `WHERE enrollment_date > '2024-01-31'` | `{ enrollmentDate: { $gt: new Date("2024-01-31") } }` |
| Update branch | `UPDATE students SET branch = 'IT' WHERE id = 2;` | `updateOne({ _id }, { $set: { branch: "IT" } })` |
| Delete | `DELETE FROM students WHERE id = 5;` | `deleteOne({ _id })` |

## Key Concepts

| Term | Meaning |
|---|---|
| **DBMS** | Software that stores, retrieves and protects data (PostgreSQL, MySQL, MongoDB) |
| **Relational (SQL)** | Tables with a fixed schema, foreign keys, joins, ACID transactions |
| **Document (NoSQL)** | JSON-like documents, flexible schema, easy horizontal scaling |
| **ACID** | Atomicity, Consistency, Isolation, Durability |

---

<div align="center">

[Lecture 8](../Lecture%208/README.md) | [Theory Index](../README.md) | [Lecture 14](../Lecture%2014/README.md)

</div>

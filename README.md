<div align="center">

# Backend Development

### CSFS3008P | B.Tech CSE, Semester 5

**University of Petroleum and Energy Studies (UPES), Dehradun**

**Uday Bansal** | SAP ID: 590013278

</div>

---

## About This Repository

This repository contains the complete coursework for the **Backend Development** course (CSFS3008P) at UPES, covering backend fundamentals from HTTP and REST APIs through databases, frameworks, containerization and CI/CD pipelines. The work spans five units with hands-on lab experiments, lecture exercises, graded assignments and a Project-Based Learning (PBL) project.

**Coursework Website:** [udaybansal0109.github.io/BackendDevelopment](https://udaybansal0109.github.io/BackendDevelopment/)
| **Course Material:** [UPES SOCS Lectures](https://upessocs.github.io/#d=/Lectures/Backend%20Development/&f=list.txt)

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Repository Structure](#repository-structure)
- [Unit 1 — Introduction to Backend Development](#unit-1--introduction-to-backend-development)
- [Unit 2 — Databases and RESTful APIs](#unit-2--databases-and-restful-apis)
- [Unit 3 — Backend Frameworks](#unit-3--backend-frameworks)
- [Unit 4 — Deployment, CI/CD and Scaling](#unit-4--deployment-cicd-and-scaling)
- [Lab Experiments](#lab-experiments)
- [Assignments](#assignments)
- [PBL Assignment](#pbl-assignment)
- [How to Run](#how-to-run)
- [Tracking Documents](#tracking-documents)

---

## Technologies Used

| Category | Technologies |
|---|---|
| **Languages** | JavaScript (ES6+), Python 3.12+, HTML5, CSS3, SQL |
| **Backend Frameworks** | Node.js, Express.js, FastAPI, Flask, Django |
| **Databases** | MongoDB (Mongoose), PostgreSQL (JSONB), SQLite, SQLAlchemy |
| **Templating** | EJS, Jinja2 |
| **Authentication** | JWT (jsonwebtoken), bcryptjs, express-session, cookie-parser |
| **Containerization** | Docker, Docker Compose, nginx |
| **CI/CD** | GitHub Actions |
| **Testing** | pytest, Django unittest, automation scripts |
| **API Documentation** | Swagger UI, ReDoc |
| **Tools** | curl, Postman, nodemon, uv |

---

## Repository Structure

```
backend/
├── lab/                              # Laboratory experiments
│   ├── Experiment-01-HTML5/          # HTML5 elements
│   ├── Experiment-05-JavaScript/     # JavaScript fundamentals
│   ├── Experiment-07-08-ES6-DOM/     # ES6, DOM and event handling
│   ├── Experiment-12-Node-Express-EJS/   # Express with EJS templates
│   ├── Experiment-12B-Sessions-Cookies/  # Sessions and cookies
│   ├── Experiment-13A-Mongoose/      # MongoDB with Mongoose
│   ├── Experiment-13B-Mongo-Todo-JWT/    # JWT authentication + todo API
│   ├── Experiment-15-Django-ToDo/    # Django to-do application
│   └── MyNotes/                      # Mid-semester exam project
│
├── theory/                           # Lecture exercises and assignments
│   ├── Lecture 3/  ... Lecture 29/   # Individual lecture exercises
│   ├── Lecture 37-39_Docker_Deployment/  # Docker deployment
│   ├── Docker Basic Commands/        # Docker fundamentals
│   ├── Express.js Task/              # Express containerization
│   └── Assignment/                   # Graded assignments
│       ├── Assignment 1/             # Notes App (localStorage)
│       └── Assignment 2/             # PostgreSQL JSONB
│
├── docs/                             # GitHub Pages coursework website
├── BACKEND_COURSEWORK_INVENTORY.md   # Full coursework inventory
└── BACKEND_COMPLETION_TRACKER.md     # Completion status tracker
```

---

## Unit 1 — Introduction to Backend Development

Covers server setup, HTTP fundamentals, REST API design, sessions, web storage and server-side rendering.

| Lecture | Topic | Stack | README | Report |
|:-:|---|---|:-:|:-:|
| 3 | Setting up the backend environment | Express, Flask | [View](theory/Lecture%203/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%203/Report.html) |
| 4 | HTTP requests, DevTools, curl, Postman, fetch | HTTP tools | [View](theory/Lecture%204/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%204/Report.html) |
| 5 | RESTful APIs with FastAPI | FastAPI, Swagger | [View](theory/Lecture%205/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%205/Report.html) |
| 6 | Sessions, cookies and state management | Theory | [View](theory/Lecture%206/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%206/Report.html) |
| 7 | localStorage, sessionStorage and JSON | JavaScript | [View](theory/Lecture%207/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%207/Report.html) |
| 8 | Server-side rendering and templating | EJS, Jinja2 | [View](theory/Lecture%208/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%208/Report.html) |

## Unit 2 — Databases and RESTful APIs

Covers relational and document databases, schema design, normalization and building RESTful APIs.

| Lecture | Topic | Stack | README | Report |
|:-:|---|---|:-:|:-:|
| 13 | Introduction to databases | PostgreSQL, MongoDB | [View](theory/Lecture%2013/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%2013/Report.html) |
| 14 | Schema design and normalization (3NF) | PostgreSQL | [View](theory/Lecture%2014/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%2014/Report.html) |
| 15 | Data modeling | SQLAlchemy, Mongoose | [View](theory/Lecture%2015/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%2015/Report.html) |
| 19 | Implementing RESTful APIs | FastAPI, SQLAlchemy | [View](theory/Lecture%2019_RESTful_APIs/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%2019_RESTful_APIs/Report.html) |

## Unit 3 — Backend Frameworks

Covers Express.js and Django in depth, including middleware, authentication, testing and debugging.

| Lecture | Topic | Stack | README | Report |
|:-:|---|---|:-:|:-:|
| 25 | Introduction to Express.js | Express | [View](theory/Lecture%2025_Express/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%2025_Express/Report.html) |
| 26 | Django framework (includes L27-L31 features) | Django | [View](theory/Lecture%2026_Django_Framework/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%2026_Django_Framework/Report.html) |
| 29 | Testing and debugging Django | Django, unittest | [View](theory/Lecture%2029_Django_Testing_Debugging/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%2029_Django_Testing_Debugging/Report.html) |

## Unit 4 — Deployment, CI/CD and Scaling

Covers Docker fundamentals, containerization, deployment and CI/CD pipelines.

| Folder | Topic | Stack | README | Report |
|:-:|---|---|:-:|:-:|
| — | Docker basic commands | Docker, nginx | [View](theory/Docker%20Basic%20Commands/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Docker%20Basic%20Commands/Report.html) |
| — | Express.js containerized task | Express, Docker | [View](theory/Express.js%20Task/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Express.js%20Task/Report.html) |
| 37-39 | Deployment and containerization | Docker, FastAPI, Express | [View](theory/Lecture%2037-39_Docker_Deployment/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/theory/Lecture%2037-39_Docker_Deployment/Report.html) |

---

## Lab Experiments

Each experiment builds progressively from front-end basics to full-stack development with authentication and frameworks.

| # | Experiment | Technologies | README | Report |
|:-:|---|---|:-:|:-:|
| 01 | All elements of HTML5 | HTML5, CSS | [View](lab/Experiment-01-HTML5/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/lab/Experiment-01-HTML5/Report.html) |
| 05 | JavaScript arrays, objects and functions | JavaScript, Node.js | [View](lab/Experiment-05-JavaScript/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/lab/Experiment-05-JavaScript/Report.html) |
| 07-08 | ES6 features, DOM and event handling | ES6, DOM | [View](lab/Experiment-07-08-ES6-DOM/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/lab/Experiment-07-08-ES6-DOM/Report.html) |
| 12A | Node.js, Express and EJS templates | Express, EJS | [View](lab/Experiment-12-Node-Express-EJS/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/lab/Experiment-12-Node-Express-EJS/Report.html) |
| 12B | Sessions and cookies | Express, express-session | [View](lab/Experiment-12B-Sessions-Cookies/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/lab/Experiment-12B-Sessions-Cookies/Report.html) |
| 13A | MongoDB with Mongoose | Express, Mongoose | [View](lab/Experiment-13A-Mongoose/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/lab/Experiment-13A-Mongoose/Report.html) |
| 13B | JWT login and todo API | Express, MongoDB, JWT | [View](lab/Experiment-13B-Mongo-Todo-JWT/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/lab/Experiment-13B-Mongo-Todo-JWT/Report.html) |
| 15 | Django To-Do application | Django, SQLite | [View](lab/Experiment-15-Django-ToDo/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/lab/Experiment-15-Django-ToDo/Report.html) |
| Mid-Sem | MyNotes (exam project) | Express, EJS, MongoDB | [View](lab/MyNotes/README.md) | [Report](https://udaybansal0109.github.io/BackendDevelopment/lab/MyNotes/Report.html) |

> Full lab index with highlights: [lab/README.md](lab/README.md)

---

## Assignments

### Assignment I — Notes App with localStorage

A browser-based notes application built with HTML, CSS and vanilla JavaScript. Notes persist in `localStorage` and support CRUD operations, categories, search, filtering, import/export and dark mode.

| Feature | Status |
|---|:-:|
| Create, read, update, delete notes | Done |
| Persist across page refresh (localStorage) | Done |
| Search and category filter | Done |
| Import/export as JSON | Done |
| Dark mode with theme persistence | Done |
| Mark notes as complete/incomplete | Done |

**Screenshots:**

| Light Mode | Dark Mode |
|:-:|:-:|
| ![Notes in light mode](theory/Assignment/Assignment%201/screenshot/assignment-1-notes-light-mode.png) | ![Notes in dark mode](theory/Assignment/Assignment%201/screenshot/assignment-1-dark-mode.png) |

| Search | Category Filter | Completed Note |
|:-:|:-:|:-:|
| ![Search](theory/Assignment/Assignment%201/screenshot/assignment-1-search.png) | ![Filter](theory/Assignment/Assignment%201/screenshot/assignment-1-category-filter.png) | ![Complete](theory/Assignment/Assignment%201/screenshot/assignment-1-completed-note.png) |

> Full details: [Assignment 1 README](theory/Assignment/Assignment%201/README.md)

### Assignment II — PostgreSQL as SQL + NoSQL with JSONB

Demonstrates how PostgreSQL can serve as both a relational and document database using JSONB columns. Includes five conceptual questions (Part A) and seven hands-on tasks (Part B) with a MongoDB comparison.

| Task | Description |
|---|---|
| Part A | `json` vs `jsonb`, hybrid SQL+NoSQL tables, JSONB operators, GIN indexes, PostgreSQL vs MongoDB |
| Part B | Schema creation, 5 products in 3 categories, per-category queries, containment, `EXPLAIN ANALYZE` |

**Screenshots:**

| Products Table and Queries | EXPLAIN ANALYZE (Seq Scan vs Bitmap Index Scan) |
|:-:|:-:|
| ![PostgreSQL output](theory/Assignment/Assignment%202/screenshot/assignment-2-postgres-products.png) | ![EXPLAIN ANALYZE](theory/Assignment/Assignment%202/screenshot/assignment-2-postgres-explain.png) |

> Full details: [Assignment 2 README](theory/Assignment/Assignment%202/README.md)

---

## PBL Assignment

**Repository:** [github.com/UdayBansal0109/Backend-PBL](https://github.com/UdayBansal0109/Backend-PBL)

A Student Management API built with FastAPI and SQLite, containerized with Docker and deployed through a GitHub Actions CI/CD pipeline. The pipeline runs automation tests, builds a Docker image, smoke-tests the container and pushes to Docker Hub.

```
git push  -->  GitHub Actions
                ├── Job 1: test        (install, start API, run automationTesting.py)
                └── Job 2: build-push  (needs: test) build image, smoke test, push to Docker Hub
```

---

## How to Run

| Prerequisite | Version | Used by |
|---|---|---|
| Node.js and npm | 18+ | Labs 05, 07-08, 12A, 12B, 13A, 13B, MyNotes; Lectures 3, 4, 7, 8, 25 |
| Python 3.12+ | with pip or [uv](https://docs.astral.sh/uv/) | Labs 15; Lectures 5, 19, 26, 29; Assignments; PBL |
| MongoDB Community Server | 7+ | Labs 13A, 13B, MyNotes; Lecture 13, 15 |
| Docker Desktop | 24+ | Lecture 37-39, Docker tasks, PBL |

Each folder has its own README with specific setup instructions, run commands and expected output.

---

## Tracking Documents

- [Coursework Inventory](BACKEND_COURSEWORK_INVENTORY.md) — Complete list of all course material and corresponding implementations
- [Completion Tracker](BACKEND_COMPLETION_TRACKER.md) — Status of every lab, lecture and assignment
- [Screenshot Inventory](SCREENSHOT_INVENTORY.md) — Audit of all screenshots across the coursework

---

<div align="center">

**Uday Bansal** | B.Tech CSE, Semester 5 | UPES, School of Computer Science

[Coursework Website](https://udaybansal0109.github.io/BackendDevelopment/) | [Course Material](https://upessocs.github.io/#d=/Lectures/Backend%20Development/&f=list.txt)

</div>

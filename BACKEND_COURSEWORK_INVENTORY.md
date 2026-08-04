# Backend Development (CSFS3008P) — Coursework Inventory

Source of truth: <https://upessocs.github.io/#d=/Lectures/Backend%20Development/&f=list.txt>
(crawled recursively through every `list.txt`; the L07 folder has no `list.txt`, its `index.html` was read directly).

Legend for **Status**: `Pre-existing` = already in the repo before this pass · `Done` = implemented + verified ·
`Partial` = implemented, but some sub-step needs a tool/account that is not available here (see tracker) · `Optional` = marked optional by the course.

Live status of every row is kept in [BACKEND_COMPLETION_TRACKER.md](BACKEND_COMPLETION_TRACKER.md).

---


> **Folder changes on 25-11-2026 (12:35–13:11):** you moved the folders listed below to the Recycle Bin.
> Their rows are marked **Removed** – nothing was restored. They can be brought back from the Recycle Bin
> (right-click → Restore) if needed. The Lecture 26 Django project still contains the L27–L31 code.
> Removed: lab `Experiment-00-Git`, `-02-CSS`, `-03-Responsive`, `-04-Bootstrap-Tailwind`, `-06-Form-Validation`,
> `-09-10-11-AJAX-jQuery`, `-14-PostgreSQL`, `Mid-Exam-Set-A/B/C`; theory `Lecture 16, 17, 18, 20, 22, 23, 24, 27, 28,
> 30, 31, 40-41, 42-43, 44-45, 46-47, 48, 49, 52, 55, 58` folders and `Assignment/Assignment 3`.

## Course-level files

| Source file | Content | Deliverable |
|---|---|---|
| `01 Syllabus Backend Development CSFS3008P.pdf/.docx` | Syllabus (5 units, CO1–CO5) | none (reference only) |
| `02 Course Plan … V002.pdf/.docx` | Lecture plan | none (reference only) |
| `Lab/batch status.csv` | Batch-wise experiment tracking sheet | none |
| `Theory/Misc/CORS.md`, `Theory/Misc/UV python package management.md` | Reference notes, no exercises | none |

---

## LAB

| # | Source file (section) | Requirement | Destination | Status |
|---|---|---|---|---|
| L-0A | `Lab/001 Exp 0 Part A Git Basics.md` (Git Hands-on; Exp 2–5; "Optional Challenges" 1–8) | Configure identity/SSH, init, add/commit, branching, merge conflict, stash, remote, fetch vs pull, rebase, submodule | `lab/Experiment-00-Git/` | Removed (Recycle Bin) |
| L-0B | `Lab/002 Exp 0 Part B Optional Git Hands-on/001–006` | Optional reading: VCS need, config, branch/merge/rebase, remote/submodule, stash, summary | `lab/Experiment-00-Git/` (same script covers it) | Removed (Recycle Bin) |
| L-01 | `Lab/Exp 01 …HTML5.md` (Practice Tasks 1–5, Viva) | Blog page (header/nav/article/section/**aside**/footer), event registration form, comparison table, multimedia gallery, interactive elements (details/datalist/dialog/range+output) | `lab/Experiment-01-HTML5/index.html` | Pre-existing (sidebar `<aside>` was missing – added) |
| L-02 | `Lab/Exp 02 …Cascading style sheets.md` (Practice Tasks 1–5) | Inline/internal/external CSS; ≥10 selectors; flex nav + grid + responsive; animation gallery (hover, spinner, background); dark-mode theme toggle | `lab/Experiment-02-CSS/` | Removed (Recycle Bin) |
| L-03 | `Lab/Exp 03 …Responsive Web page….md` (Tasks 1–5, Exercises 1–3) | Viewport skeleton, flex row, media query stacking, responsive navbar, footer + grid; Ex: 4 columns >1024px, responsive img, `prefers-color-scheme: dark` | `lab/Experiment-03-Responsive/` | Removed (Recycle Bin) |
| L-04 | `Lab/Exp 04 …Bootstrap.md` (Tasks 1–8, Exercises 1–3) | Bootstrap page (setup, navbar, hero, cards, footer); Tailwind page (setup, navbar, hero, cards+footer); Ex: Bootstrap contact form, Tailwind contact form, class-count comparison | `lab/Experiment-04-Bootstrap-Tailwind/` | Removed (Recycle Bin) |
| L-05 | `Lab/Exp 05 …JavaScript array, object and functions.md` (Tasks 1–4, PBL) | `script.js`, `script2.js`, `index.html`, run with Node; PBL `library` + `addBook` + `findBook` | `lab/Experiment-05-JavaScript/` | Done |
| L-06 | `Lab/000 List of Experiments.md` row 6 (no separate file published) | Client-side form validation with JavaScript | `lab/Experiment-06-Form-Validation/` | Removed (Recycle Bin) |
| L-07/08 | `Lab/Exp 07_08 ES6, DOM…md` (§1–5 demos, §6 Practical Exercise) | ES6 features demo + DOM/event demo; Interactive To-Do list (add, toggle, delete, Enter key, delegation) | `lab/Experiment-07-08-ES6-DOM/` | Done |
| L-09–11 | `Lab/Exp 09_10_11.md` (§6 Parts A–F, §10 Tasks 1–6) | AJAX with JSON (fetch) + XML (XMLHttpRequest), jQuery programs, full website; Tasks: email+semester fields, search box, course filter (JS + jQuery), course directory JSON, Express backend endpoint, AI-review notes | `lab/Experiment-09-10-11-AJAX-jQuery/` | Removed (Recycle Bin) |
| L-12A | `Lab/Exp 12 A Nodejs npm express nodemon and ejs.md` (tutorial + Lab Tasks 1–5) | Node script, Express server, nodemon, EJS views; Task 1 name/roll/branch as text/HTML/JSON; Task 2 calculator with modulus & power; Task 3 `/students`, `/students/:id`, `POST /students/add`; Task 4 EJS timetable; Task 5 EJS registration form → result page | `lab/Experiment-12-Node-Express-EJS/` | Pre-existing, **fixed**: `views/` folder was missing (EJS routes crashed) and Tasks 1–5 were incomplete |
| L-12B | `Lab/Exp 12 B (Optional) State Management.md` (Exercises 1–2) | Session/cookie demo; Ex 1 register/login/dashboard/logout with auth middleware (+bcrypt challenge); Ex 2 per-session to-do list (+theme cookie challenge) | `lab/Experiment-12B-Sessions-Cookies/` | Pre-existing demo kept; exercises added |
| L-13 | `Lab/Exp 13 _ Installation of MongoDB.md` | Install MongoDB / mongosh | `lab/Experiment-13A-Mongoose/README.md` (install notes) | Done (MongoDB service already installed on the laptop; tests used a separate in-memory MongoDB so real data was not touched) |
| L-13A | `Lab/Exp 13 A MongoDB, Mongoose…md` | Express + **Mongoose** registration/login/users list | `lab/Experiment-13A-Mongoose/` | Pre-existing, **fixed**: it stored users in a JSON file and never used Mongoose |
| L-13B | `Lab/Exp 13 B (Optional) …ToDo App….md` (Experiments 1–4) | `config/db.js`, User model (bcrypt), register/login (JWT), auth middleware, Todo model + CRUD routes | `lab/Experiment-13B-Mongo-Todo-JWT/` | Optional → Done |
| L-14 | `Lab/Exp 14 (Optional) Postgresql.md` (Assignment) | `student_management` DB, `students` table, 5 rows, 4 queries; MongoDB collection with 3 docs; comparison | `lab/Experiment-14-PostgreSQL/` | Removed (Recycle Bin) |
| L-15v1 | `Lab/Exp 15 Django Todo App v1 Basic.md` (Lab Assignment Task) | Extend To-Do app: serve `static` files; use `extends` + `include` | `lab/Experiment-15-Django-ToDo/` | Pre-existing (satisfied by v2 project) |
| L-15v2 | `Lab/Exp 15 Django Todo App v2.md` (§11 Final assignment) | Branded responsive tracker: base/header/footer templates, extra block, static css/js/image, CSRF POST actions, admin with list_display/filter/search, empty-state message | `lab/Experiment-15-Django-ToDo/` | Pre-existing; README + automated tests were empty – added |
| MID-A | `Lab/MID EXAM/Exam 01 A.md` | "My Notes": Express/EJS + MongoDB, add/list/delete, validation, bonus | `lab/Mid-Exam-Set-A-Notes/` | Removed (Recycle Bin) |
| MID-B | `Lab/MID EXAM/Exam 01 B.md` | "Eisenhower Todo": 4-quadrant matrix, add/delete, validation, bonus | `lab/Mid-Exam-Set-B-Eisenhower-Todo/` | Removed (Recycle Bin) |
| MID-C | `Lab/MID EXAM/Exam 01 C.md` | "Simple CMS": post list (title link, author, date), create post with server-side date, single post page by id | `lab/Mid-Exam-Set-C-Simple-CMS/` | Removed (Recycle Bin) |

---

## THEORY — Assignments

| # | Source | Requirement | Destination | Status |
|---|---|---|---|---|
| A-1 | `Theory/Assignment 1.md` → L07 §12 Final Task | Notes app with localStorage: add/display/delete/edit, persists, id/text/createdAt/updatedAt; stretch: complete, search, export/import JSON, dark mode | `theory/Assignment/Assignment 1/` | Done |
| A-2 | `Theory/Assignment 2.md` (Part A Q1–5, Part B Tasks 1–7) | PostgreSQL JSONB conceptual answers + product catalog SQL (schema, inserts, queries, containment, update, GIN index + EXPLAIN, MongoDB comparison) | `theory/Assignment/Assignment 2/` | Done |
| A-3 | `Theory/Assignment 3 Presentation.md`, `Unit 5/L59…md` | 5–7 min presentation (8–12 slides) on one Unit-V topic + presenter notes, diagram, comparison, example, 2–4 Q&A, annotated references | `theory/Assignment/Assignment 3/` | Removed (Recycle Bin) |

## THEORY — Unit 1

| # | Source (section) | Requirement | Destination | Status |
|---|---|---|---|---|
| U1-L01, L02 | `L01 Overview…`, `L02 Client–Server…` | Theory only, no exercise | — | n/a |
| U1-L03 | `L03 Setting Up…` (Tasks 1–8, Lab Exercise 1–5) | Express tasks 1–5, Flask tasks 6–7, DevTools; add `/students/branch/:branch`; add Flask `POST /students`; DevTools screenshot | `theory/Lecture 3/` | Partial (screenshot must be taken by you) |
| U1-L04 | `L04 HTTP Requests…` (Tasks 1–5, Lab Exercise 1–5) | DevTools, curl, Postman, fetch, Flask inspection; fetch + filter CSE; `curl -v` headers | `theory/Lecture 4/` | Partial (DevTools/Postman screenshots by you; Postman collection provided) |
| U1-L05 | `L05 RESTful APIs and FastAPI` (Lab Exercise 1–5) | FastAPI Course CRUD (5 ops), Swagger/ReDoc, `?department=` filter | `theory/Lecture 5/` | Done (Swagger + ReDoc screenshots captured) |
| U1-L06 | `L06 Managing server-side Session…` | Theory + demo (covered by Lab 12B) | — | n/a |
| U1-L07 | `L07 LocalStorage…/index.html` (Ex 2.1, 3.1, §12) | Browser exercises + Final Task (= Assignment 1) | `theory/Lecture 7/README.md` → Assignment 1 | Done |
| U1-L08 | `L08 Server-Side Rendering…` (Lab Exercise 1–5) | EJS table w/ alternating rows, `/about`, custom CSS; FastAPI Jinja2 `{{ now }}`; static image | `theory/Lecture 8/` | Done |

## THEORY — Unit 2

| # | Source | Requirement | Destination | Status |
|---|---|---|---|---|
| U2-L13 | `L13 Introduction to Databases` (Lab Ex 1–6) | `student_management` DB + `students` table + 5 inserts + 4 queries; Mongo collection; comparison | `theory/Lecture 13/` | Done (SQL verified on embedded PostgreSQL) |
| U2-L14A | `L14 A Database Schema Design` (Lab Ex 1–5) | Library ER diagram, schema with M:N authors, CREATE TABLEs, normalize order table to 3NF, create + insert | `theory/Lecture 14/` | Done |
| U2-L14B | `L14 B Database_Normalization` (optional practice) | Normalization practice | `theory/Lecture 14/normalization.md` | Done |
| U2-L15 | `L15 Data Modeling` (Lab Ex 1–5) | E-commerce conceptual model; SQLAlchemy Student models + CRUD + cascade; Mongoose Blog Post/Comment schemas with validation | `theory/Lecture 15/` | Done |
| U2-L16 | `L16 CRUD Operations` (Lab Ex 1–6) | FastAPI+SQLAlchemy Course CRUD, filter (department, credits), pagination (10/page), Student→Department FK CRUD, 3 SQL queries, Postman | `theory/Lecture 16_CRUD_Operations/` | Removed (Recycle Bin) |
| U2-L17 | `L17 Query Optimization` (Lab Ex 1–7) | 100k rows, timing without/with index, EXPLAIN, rewrite slow query, connection pooling, benchmark | `theory/Lecture 17_Query_Optimization/` | Removed (Recycle Bin) |
| U2-L18 | `L18 Designing RESTful APIs` (Lab Ex 1–6) | Library API design doc, endpoint docs, Pydantic models, filters, pagination plan, Swagger | `theory/Lecture 18_Designing_RESTful_APIs/` | Removed (Recycle Bin) |
| U2-L19 | `L19 Implementing RESTful APIs` (Lab Ex 1–7) | Student API CRUD, filter/search, pagination meta, `POST /courses`, nested enrollments, 404/409/422 | `theory/Lecture 19_RESTful_APIs/` | Done |
| U2-L20 | `L20 Authentication Mechanisms` (Lab Ex 1–6) | JWT auth, hashed password, `/register` `/login`, protect DELETE (admin or self), 401 test, expiry test | `theory/Lecture 20_Authentication/` | Removed (Recycle Bin) |
| U2-L21 | `L21 Authorization Mechanisms` | Theory only (RBAC applied in L20/L30) | — | n/a |
| U2-L22 | `L22 Handling API Requests…` (Lab Ex 1–6) | Course validation, photo upload validation, response model w/o secrets, cross-field validator, invalid-data tests, `/login` rate limit 5/min | `theory/Lecture 22_Requests_Responses/` | Removed (Recycle Bin) |
| U2-L23 | `L23 API Versioning…` (Lab Ex 1–6) | `/api/v1` + `/api/v2` (paginated), deprecation headers, Swagger metadata/tags/examples, Postman collection + 2 environments | `theory/Lecture 23_API_Versioning/` | Removed (Recycle Bin) |
| U2-L24 | `L24 Assignment-I Discussion…` (Lab Ex 1–6) | Code review w/ checklist, 3 improvements, refactor, unit tests, docs, cloud deploy | `theory/Lecture 24_Assignment_I_Review/` | Removed (Recycle Bin) |

## THEORY — Unit 3

| # | Source | Requirement | Destination | Status |
|---|---|---|---|---|
| U3-L25 | `L25 Introduction to Express.js` (PBL) | Express project, `app.js` → "API is running" | `theory/Lecture 25_Express/` | Done |
| U3-L26 | `L26 Django Framework` (Part C) | Django Student Management API project | `theory/Lecture 26_Django_Framework/` | Pre-existing (extended by L27–L31) |
| U3-L27 | `L27 Django Middleware and Routing` (Tasks 1–4, PBL) | Request-logging middleware (method, path, status, time), register it, list/detail routes, diagnose a routing error | `theory/Lecture 26_Django_Framework/` + `theory/Lecture 27_Django_Middleware_Routing/` | Removed (Recycle Bin) |
| U3-L28 | `L28 Integrating Third-Party APIs` (Tasks 1–5, PBL) | `requests` service utility, view, route, 2 s timeout, 503 on failure, mocked tests | same Django project + `theory/Lecture 28_Third_Party_APIs/` | Removed (Recycle Bin) |
| U3-L29 | `L29 Testing and Debugging` (Tasks 1–5, PBL) | Tests for health/list/detail, model tests, mocked service (success + timeout), diagnose defect | same project + `theory/Lecture 29_Django_Testing_Debugging/` | Pre-existing (1 test) → extended |
| U3-L30 | `L30 Security, Authentication…` (Student Tasks 1–7) | superuser, regular user, `login_required`, login URL, `students.view_student` permission, test anonymous/regular/authorized | same project + `theory/Lecture 30_Django_Security/` | Removed (Recycle Bin) |
| U3-L31 | `L31 Caching and Performance` (Student Tasks 1–7) | measure queries, N+1, `select_related`/`prefetch_related`, 5-min cache, compare, stale-data explanation | same project + `theory/Lecture 31_Caching_Performance/` | Removed (Recycle Bin) |
| U3-OptA | `Unit 3/Optional/A Django Forms.md` (§16 exercises 1–8) | Optional | — | Optional – not done (see tracker) |
| U3-OptB | `Unit 3/Optional/B Django File Uploads.md` (§25 PBL) | Optional | — | Optional – not done (see tracker) |

## THEORY — Unit 4

| # | Source | Requirement | Destination | Status |
|---|---|---|---|---|
| U4-D1..5 | `Unit 4/Docker Handson/1–5` | Docker basic commands, attach, commit/preserve, Dockerfile, compose | `theory/Docker Basic Commands/` | Pre-existing (screenshots) |
| U4-Comb | `Unit 4/001 Combined Hands On Task.md` | Containerize FastAPI, push to Docker Hub, monitor/scale | `theory/Express.js Task/` (Express variant) + L37–L41 folders | Partial (containerize/monitor/scale done; Docker Hub push needs your token) |
| U4-L37 | `L37-L39 Deployment, Containerization…` (PBL §16–17, Exit Q) | `student-docker-api` with FastAPI + Express apps, Dockerfiles, `.dockerignore`, README, exit questions | `theory/Lecture 37-39_Docker_Deployment/student-docker-api/` | Done (both images built, run and tested with Docker) |
| U4-L40 | `L40-L41 Monitoring and Scaling` (PBL §20–21, Exit Q) | Request logging, 2 instances, nginx load balancer, scaling plan, exit questions | `theory/Lecture 40-41_Monitoring_Scaling/` | Removed (Recycle Bin) |
| U4-L42 | `L42-L43 CI/CD with GitHub Actions` (Student task, §28, Exit Q) | Tests for `/`, `/health`, `/students`; `ci.yml`, `cd.yml` (GHCR, SHA tags), README | `theory/Lecture 42-43_CICD/student-api-cicd/` | Removed (Recycle Bin) |
| U4-L44 | `L44-L45 GitHub Actions Test Automation` | FastAPI calculator API, requests test runner, parametrized pytest, GitHub Actions workflow | `theory/Lecture 44-45_API_Test_Automation/` | Removed (Recycle Bin) |
| U4-L46 | `L46-L47 Infrastructure Configuration…` (PBL §28–30) | env config, `.env.example`, blue/green v1/v2, release strategy, rollback, `compose.yml`, `deployment.yml` | `theory/Lecture 46-47_Infrastructure_Release/` | Removed (Recycle Bin) |
| U4-L48 | `L48 Assignment-II Discussion` (PBL) | Peer review of Dockerfile + CI | `theory/Lecture 48_Assignment_II_Review/` | Removed (Recycle Bin) |

## PBL (Unit 4 – Combined Hands-On Task)
| # | Source | Requirement | Destination | Status |
|---|---|---|---|---|
| PBL | `Theory/Unit 4/001 Combined Hands On Task.md` → *PBL* 1–5 | previous project as app, Dockerfile, docker-compose.yml, `automationTesting.py` for all routes, GitHub Action (test → build → push to Docker Hub) in a new repo, link in main repo as "PBL Assignment" | `pbl-assignment/` + root `README.md` | Partial (verified locally; GitHub repo/secrets/push are yours) |

## THEORY — Unit 5

| # | Source | Requirement | Destination | Status |
|---|---|---|---|---|
| U5-L49 | `L49 Real-Time Communication…` (PBL 1–4) | Socket.io attendance room per class + notification event on Express; microservice decomposition; first extraction justification | `theory/Lecture 49_Realtime_Microservices/` | Removed (Recycle Bin) |
| U5-L52 | `L52 Service Discovery…` (PBL 1–4) | Consul registry + RabbitMQ `attendance.marked` + idempotency; sync/async classification; serverless migration choice | `theory/Lecture 52_Service_Discovery_Messaging/` | Removed (Recycle Bin) |
| U5-L55 | `L55 Serverless Architecture…` (PBL 1–4) | Lambda + SQS + DynamoDB idempotency, anti-pattern audit, SaaS/PaaS/FaaS classification | `theory/Lecture 55_Serverless/` | Removed (Recycle Bin) |
| U5-L58 | `L58 Performance Profiling` (PBL 1–4) | Latency middleware, autocannon `-c 50 -d 30`, one-page report w/ p50/p95/p99 + bottleneck | `theory/Lecture 58_Performance_Profiling/` | Removed (Recycle Bin) |
| U5-L59 | `L59 Assignment III Presentation` | = Assignment 3 | `theory/Assignment/Assignment 3/` | Removed (Recycle Bin) |

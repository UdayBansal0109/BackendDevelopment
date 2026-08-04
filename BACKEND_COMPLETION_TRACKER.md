# Backend Development – Completion Tracker

Status values: **Pending** · **In Progress** · **Completed** · **Needs Attention**
IDs match [BACKEND_COURSEWORK_INVENTORY.md](BACKEND_COURSEWORK_INVENTORY.md). "Completed" means the requirement was implemented **and** verified (see the Verification column).

_Last updated: 2026-11-25_


> **Folder changes on 25-11-2026 (12:35–13:11):** you moved the folders listed below to the Recycle Bin.
> Their rows are marked **Removed** – nothing was restored. They can be brought back from the Recycle Bin
> (right-click → Restore) if needed. The Lecture 26 Django project still contains the L27–L31 code.
> Removed: lab `Experiment-00-Git`, `-02-CSS`, `-03-Responsive`, `-04-Bootstrap-Tailwind`, `-06-Form-Validation`,
> `-09-10-11-AJAX-jQuery`, `-14-PostgreSQL`, `Mid-Exam-Set-A/B/C`; theory `Lecture 16, 17, 18, 20, 22, 23, 24, 27, 28,
> 30, 31, 40-41, 42-43, 44-45, 46-47, 48, 49, 52, 55, 58` folders and `Assignment/Assignment 3`.

## 🌐 Website
Live at <https://udaybansal0109.github.io/BackendDevelopment/> (GitHub Pages, `main` / `docs`) – all 57 links verified.

## Lab
| ID | Folder | Status | Verification |
|---|---|---|---|
| L-0A/0B | `lab/Experiment-00-Git` | Removed (Recycle Bin) | `git-practice.sh` executed → `output.txt` (conflict, stash, rebase, fetch/pull, submodule shown). GitHub push itself not done (local bare repo used as remote) |
| L-01 | `lab/Experiment-01-HTML5` | Completed | Pre-existing; tag check for all 5 practice tasks; added missing `<aside>` |
| L-02 | `lab/Experiment-02-CSS` | Removed (Recycle Bin) | 4 pages + external `style.css` |
| L-03 | `lab/Experiment-03-Responsive` | Removed (Recycle Bin) | Tasks 1–5 + Exercises 1–3 in one page |
| L-04 | `lab/Experiment-04-Bootstrap-Tailwind` | Removed (Recycle Bin) | Class count script for Exercise 3 (`COMPARISON.md`) |
| L-05 | `lab/Experiment-05-JavaScript` | Completed | `node` run → `output.txt` |
| L-06 | `lab/Experiment-06-Form-Validation` | Removed (Recycle Bin) | `node test-validation.js` passes |
| L-07/08 | `lab/Experiment-07-08-ES6-DOM` | Completed | `node es6-features.js`, `node modules-demo.mjs` → `output.txt`; `node --check app.js` |
| L-09–11 | `lab/Experiment-09-10-11-AJAX-jQuery` | Removed (Recycle Bin) | Tested in browser via `server.js`: JSON, XML, API, search, both filters, courses, error cases |
| L-12A | `lab/Experiment-12-Node-Express-EJS` | Completed | Fixed missing `views/`; Tasks 1–5 added; all routes curl-tested → `test-output.txt` |
| L-12B | `lab/Experiment-12B-Sessions-Cookies` | Completed | Exercise 1 + 2 curl-tested → `exercises-test-output.txt` |
| L-13 | (install notes in 13A README) | Completed | MongoDB service is running on this laptop (not touched – tests used a separate in-memory MongoDB) |
| L-13A | `lab/Experiment-13A-Mongoose` | Completed | Converted to Mongoose; tested against in-memory MongoDB → `test-output.txt` |
| L-13B | `lab/Experiment-13B-Mongo-Todo-JWT` | Completed | 13-step API test against test MongoDB → `test-output.txt` |
| L-14 | `lab/Experiment-14-PostgreSQL` | Removed (Recycle Bin) | SQL run on PGlite (embedded PostgreSQL) → `postgres-output.txt`; Mongo script run → `mongo-output.txt` |
| L-15 | `lab/Experiment-15-Django-ToDo` | Completed | Fixed logo 404 + added extra blocks; `manage.py check` OK; 14 tests pass |
| MID-A/B/C | `lab/Mid-Exam-Set-*` | Removed (Recycle Bin) | All 3 apps curl-tested against test MongoDB; screenshots captured with headless Edge |

## Theory
| ID | Folder | Status | Verification |
|---|---|---|---|
| A-1 | `theory/Assignment/Assignment 1` | Completed | Browser test: add/edit/delete/complete/search/filter/theme, persists after reload |
| A-2 | `theory/Assignment/Assignment 2` | Completed | SQL incl. GIN EXPLAIN run on PGlite; Mongo script run; answers written |
| A-3 | `theory/Assignment/Assignment 3` | Removed (Recycle Bin) | 11-slide .pptx + PDF + presenter notes; rendered with PowerPoint and visually checked. *Review/rephrase before submitting (AI-content check)* |
| U1-L03 | `theory/Lecture 3` | Needs Attention | Express + Flask curl-tested (`test-output.txt`). **DevTools screenshot must be taken by you** |
| U1-L04 | `theory/Lecture 4` | Needs Attention | curl/-v + fetch run (`curl-output.txt`), Postman collection file. **DevTools + Postman screenshots by you** |
| U1-L05 | `theory/Lecture 5` | Completed | 6 pytest tests; Swagger + ReDoc screenshots |
| U1-L07 | `theory/Lecture 7` | Completed | README answers; final task = A-1 |
| U1-L08 | `theory/Lecture 8` | Completed | curl tests + 4 screenshots |
| U2-L13 | `theory/Lecture 13` → Exp 14 | Completed | see L-14 |
| U2-L16 | `theory/Lecture 16_CRUD_Operations` | Removed (Recycle Bin) | 4 pytest tests; SQL queries run on PGlite |
| U2-L19 | `theory/Lecture 19_RESTful_APIs` | Completed | 8 pytest tests; curl demo; Swagger screenshot |
| U2-L14 | `theory/Lecture 14` | Completed | Library schema + 3NF scripts run on PGlite (`*-output.txt`) |
| U2-L15 | `theory/Lecture 15` | Completed | `crud_demo.py` (cascade 2→0), Mongoose validation + unique/populate against test MongoDB |
| U2-L17 | `theory/Lecture 17_Query_Optimization` | Removed (Recycle Bin) | EXPLAIN ANALYZE on 100k rows (32 ms → 0.6 ms); API benchmark 49 ms → 3.4 ms |
| U2-L18 | `theory/Lecture 18_Designing_RESTful_APIs` | Removed (Recycle Bin) | Design doc + 4 tests + Swagger screenshot + openapi.json |
| U2-L20 | `theory/Lecture 20_Authentication` | Removed (Recycle Bin) | 5 tests incl. 401 without token and expired token |
| U2-L22 | `theory/Lecture 22_Requests_Responses` | Removed (Recycle Bin) | 10 tests (422s, 413/415/400 upload, 429 rate limit) |
| U2-L23 | `theory/Lecture 23_API_Versioning` | Removed (Recycle Bin) | 4 tests; deprecation headers via curl; Postman requests replayed; Swagger/ReDoc screenshots |
| U2-L24 | `theory/Lecture 24_Assignment_I_Review` | Removed (Recycle Bin) | Self-review + refactor + 6 tests done. **Peer review needs a classmate; Render deploy needs your account** |
| U3-L25 | `theory/Lecture 25_Express` | Completed | curl → "API is running" |
| U3-L26–L31 | `theory/Lecture 26_Django_Framework` (+ README in each `Lecture 27…31` folder) | Completed | 19 Django tests OK; middleware log; N+1 101→2 queries; cache 0 queries; routing-error demo |
| U4-D1..5 / Comb | `theory/Docker Basic Commands`, `theory/Express.js Task` | Needs Attention | Pre-existing screenshots kept. Combined task's **Docker Hub push needs your Docker Hub account/token** (not done) |
| U4-L37 | `theory/Lecture 37-39_Docker_Deployment/student-docker-api` | Completed | Both images built and run (ports 8000/3000), all endpoints curl-tested, 0.0.0.0 problem reproduced → `run-output.txt` |
| U4-L40 | `theory/Lecture 40-41_Monitoring_Scaling/monitoring-scaling-student-api` | Removed (Recycle Bin) | 2 instances + nginx: round robin, load tests, JSON logs, failover test (`screenshots-or-output/`) |
| U4-L42 | `theory/Lecture 42-43_CICD/student-api-cicd` | Removed (Recycle Bin) | Tests (3+3), intentional failure, Docker smoke test all run locally; YAML validated. **Workflow run URL + GHCR tags need a GitHub push** |
| U4-L44 | `theory/Lecture 44-45_API_Test_Automation` | Removed (Recycle Bin) | requests runner 3/3 + pytest 10/10 against live server; workflow YAML validated (runs after push) |
| U4-L46 | `theory/Lecture 46-47_Infrastructure_Release/infrastructure-release-student-api` | Removed (Recycle Bin) | compose blue/green: v1, switch to v2 under load (185 req, 0 errors), rollback, unhealthy-switch guard, `.env` ignored check |
| U4-L48 | `theory/Lecture 48_Assignment_II_Review` | Removed (Recycle Bin) | Review written from running the code; **actual peer exchange needs a classmate** |
| U5-L49 | `theory/Lecture 49_Realtime_Microservices` | Removed (Recycle Bin) | Socket.io room test PASS; 2 instances: FAIL without / PASS with Redis adapter; `DESIGN.md` decomposition (team review is in class) |
| U5-L52 | `theory/Lecture 52_Service_Discovery_Messaging` | Removed (Recycle Bin) | Real Consul + RabbitMQ (Docker): registration, discovery, events, duplicate skipped, idempotency after restart, unhealthy instance removed; FaaS function test |
| U5-L55 | `theory/Lecture 55_Serverless` | Removed (Recycle Bin) | Handler + SAM template + duplicate test on DynamoDB Local PASS. **`sam deploy` / IAM AccessDenied checkpoint need your AWS account** |
| U5-L58 | `theory/Lecture 58_Performance_Profiling` | Removed (Recycle Bin) | 6 autocannon runs; report with bottleneck evidence (189 → 8 448 req/s) |
| PBL | [Backend-PBL](https://github.com/UdayBansal0109/Backend-PBL) (local `pbl-assignment/`) | Needs Attention | Public repo pushed; Actions run: tests ✅, Docker build ✅, container smoke test ✅. **Add DOCKERUSERNAME / DOCKERTOKEN secrets so the Docker Hub push step succeeds** |
| U3-OptA | Django Forms (optional) | Pending | Marked *Optional* in the course – not implemented in this pass |
| U3-OptB | Django File Uploads (optional) | Pending | Marked *Optional* in the course – not implemented in this pass |

## Needs Attention – what only you can do
| Item | Why it could not be done here | What to do |
|---|---|---|
| L03 / L04 DevTools + Postman screenshots | needs your interactive DevTools/Postman session | run the Lecture 3 servers, take the screenshots, save in `screenshots/` |
| L24 peer review, L48 peer review, L49/L52/L55/L58 team reviews | need classmates | do in class; self-reviews are written |
| L24 Render deploy, Combined task Docker Hub push, L42 GHCR publish + workflow URL, L55 `sam deploy` | need your Render / Docker Hub / GitHub / AWS accounts | follow the steps in each README |
| Exp 0 GitHub push / SSH key | needs your GitHub account | Removed (Recycle Bin) |

## Resume notes (for a new session)
* Course materials were downloaded to the session scratchpad; re-download from the URL in the inventory if needed.
* Test tools used: Python venv with fastapi/sqlalchemy/django/pytest, in-memory MongoDB (`mongodb-memory-server`),
  PGlite (embedded PostgreSQL), Docker Desktop, headless Edge for screenshots.

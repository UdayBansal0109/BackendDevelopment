<div align="center">

# 📦 Portable Student API · FastAPI & Express in Docker

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Status](https://img.shields.io/badge/containers-tested-brightgreen?style=flat-square)

*Same API contract – `GET /`, `/health`, `/students` – in two languages, two images, two ports.*

</div>

---

## 🧰 Installation requirements
* Docker Desktop (Docker Engine 29.9 was used) – `docker --version`
* Nothing else: Python and Node.js run **inside** the images.

## 📂 Structure
```text
student-docker-api/
├── README.md
├── run-output.txt          # real output of the commands below
├── fastapi-app/  main.py  requirements.txt  Dockerfile  .dockerignore
└── express-app/  server.js  package.json    Dockerfile  .dockerignore
```
Both apps implement the same API contract: `GET /` (name + status), `GET /health`, `GET /students`.

## 🔨 Build commands
```bash
docker build -t student-api-fastapi:1.0 ./fastapi-app
docker build -t student-api-express:1.0 ./express-app
docker images | grep student-api        # express 258 MB, fastapi 246 MB
```

## ▶️ Run commands (separate host ports)
```bash
docker run -d --name student-fastapi -p 8000:8000 student-api-fastapi:1.0
docker run -d --name student-express -p 3000:3000 student-api-express:1.0
docker ps
```

## 🧪 API test commands and successful output
```bash
curl http://localhost:8000/          # {"application":"Student API","framework":"FastAPI","status":"running"}
curl http://localhost:8000/health    # {"status":"healthy"}
curl http://localhost:8000/students  # [{"id":1,"name":"Aarav",...},{"id":2,"name":"Diya",...}]
curl http://localhost:3000/          # {"application":"Student API","framework":"Express","status":"running"}
curl http://localhost:3000/health    # {"status":"healthy"}
curl http://localhost:3000/students  # same list as FastAPI
```
`docker logs student-fastapi` shows `"GET /health HTTP/1.1" 200 OK`; full transcript in `run-output.txt`.

Clean up: `docker stop student-fastapi student-express && docker rm student-fastapi student-express`

## 🐞 One problem and its solution
**Problem:** starting the FastAPI image with `--host 127.0.0.1` → the container was "Up" and the log said
`Uvicorn running on http://127.0.0.1:8000`, but `curl http://localhost:8001/health` failed with
*empty reply from server* (curl exit 52).
**Cause:** inside a container `127.0.0.1` is the container's own loopback; Docker forwards the published port to
the container's network interface, where nothing was listening.
**Solution:** listen on all interfaces – `--host 0.0.0.0` in the Dockerfile `CMD` (and `app.listen(port, "0.0.0.0")`
in Express). After that the same request returned `{"status":"healthy"}`.

## 👥 Pair work / Dockerfile review (step 7)
Reviewed points for both Dockerfiles: small official base images (`python:3.12-slim`, `node:22-alpine`);
dependency files copied **before** the source code so the install layer is cached; `--no-cache-dir` /
`--omit=dev` keep images smaller; `.dockerignore` excludes `node_modules`, `__pycache__`, `.git`, `.env`.
Possible improvement: run as a non-root user (`USER node` / a created `appuser`) and add a `HEALTHCHECK`.
(The pair activity itself is done with a classmate in the lab.)

## ❓ Exit questions
1. **Image vs container** – an image is a read-only template (layers: OS + runtime + code); a container is a
   running instance of an image with its own writable layer and process. One image → many containers.
2. **Why `0.0.0.0`?** – so the server accepts connections arriving on the container's network interface;
   `127.0.0.1` would accept only connections from inside the container (see problem above).
3. **`-p 8000:8000`** – publish *host port* 8000 → *container port* 8000 (`-p HOST:CONTAINER`).
4. **Why `.dockerignore`?** – keeps unneeded/secret files (`node_modules`, `.git`, `.env`, caches) out of the
   build context: faster builds, smaller images, no leaked secrets, no host-specific binaries.
5. **Container exits immediately** – `docker ps -a` (exit code), `docker logs <name>`, run interactively
   `docker run -it <image> sh`, check the `CMD`, missing dependencies, wrong file names or ports.
6. **Secrets not in images** – anyone who can pull the image can read every layer (`docker history`, extract
   files); secrets would also end up in registries and caches. Pass them at run time (`-e`, `--env-file`,
   Docker/Kubernetes secrets).

---

<div align="center">

⬅️ [Lectures 37–39](../README.md) · 📘 [Theory index](../../README.md) · 🏠 [Repository home](../../../README.md)

</div>

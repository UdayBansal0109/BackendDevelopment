# Express.js Task — Containerizing an Express App

**Unit 4:** Deployment, CI/CD and Scaling

---

## Objective

Build a small Express API, test it locally, package it into a Docker image on Ubuntu, export and run again.

## Technologies

Node.js, Express.js, Docker, Ubuntu

---

## Folder Structure

```
Express.js Task/
├── express-project/
│   ├── app.js
│   └── package.json     # scripts: start, dev
└── screenshots/         # 8 screenshots of every step
```

## Routes

| Method | Route | Response |
|:-:|---|---|
| `GET` | `/` | `Hello! Express is running inside Docker.` |
| `GET` | `/api/students` | JSON list of students |

## How to Run

```bash
cd express-project
npm install
npm start                       # http://localhost:3000
```

---

## Steps Performed

| # | Step |
|:-:|---|
| 1 | Test the app locally |
| 2 | Check `/api/students` |
| 3 | Check Node.js and npm versions on Ubuntu |
| 4 | Copy the project files into the build folder |
| 5 | Install dependencies |
| 6 | Build and export the Docker image (`express-project-v1.tar`) |
| 7 | Run the container — home page |
| 8 | Run the container — students API |

## Screenshots

| Local Test | Students API |
|:-:|:-:|
| ![](screenshots/01_express_local_test.png.png) | ![](screenshots/02_express_students_api.png.png) |
| **Node and npm Versions** | **Files Copied** |
| ![](screenshots/03_ubuntu_node_npm_versions.png.png) | ![](screenshots/04_express_files_copied.png.png) |
| **Dependencies Installed** | **Image Export** |
| ![](screenshots/05_express_dependencies_installed.png.png) | ![](screenshots/06_express_image_export.png.png) |
| **Docker — Home Page** | **Docker — Students API** |
| ![](screenshots/07_express_docker_homepage.png.png) | ![](screenshots/08_express_docker_students_api.png.png) |

---

<div align="center">

[Theory Index](../README.md) | [Lectures 37-39](../Lecture%2037-39_Docker_Deployment/README.md) | [Repository Home](../../README.md)

</div>

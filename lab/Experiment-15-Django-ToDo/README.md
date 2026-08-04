# Experiment 15 — Django To-Do App (Task Tracker)

**Course:** Backend Development (CSFS3008P) | **Lab**

---

## Objective

Build a branded, responsive task tracker with Django using template inheritance, static files, CSRF-safe actions and Django Admin.

## Technologies

Python, Django, SQLite, uv

---

## Folder Structure

```
Experiment-15-Django-ToDo/
├── todo_project/          # settings.py, urls.py
├── todo/
│   ├── models.py          # Task(title, completed, created_at)
│   ├── views.py           # task_list, add_task, toggle_task (POST), delete_task (POST)
│   ├── urls.py            # Named routes
│   ├── admin.py           # list_display, list_filter, search_fields, list_editable
│   ├── tests.py           # 14 tests
│   ├── templates/todo/    # base, header, footer, task_list, add_task
│   └── static/todo/       # css/style.css, js/app.js, images/logo.png
└── Experiment-15-Screenshots/
```

## How to Run

```bash
uv sync
uv run python manage.py migrate
uv run python manage.py createsuperuser
uv run python manage.py runserver        # http://127.0.0.1:8000
uv run python manage.py test todo        # 14 tests
```

---

## Requirement Checklist

| Requirement | Where |
|---|---|
| List / add / toggle / delete tasks, empty-list message | `views.py`, `{% empty %}` in `task_list.html` |
| Tasks survive a restart | SQLite via the Django ORM |
| CSRF + POST for every change | `{% csrf_token %}`, `@require_POST` |
| Admin with list display, filter and search | `admin.py` |
| `base.html` with blocks + header/footer `{% include %}` | `templates/todo/` |
| Named URLs with `{% url %}` | All templates |
| Page-specific block | `extra_css` / `extra_js` — live character counter on Add Task |
| Static CSS, JS and logo with `{% static %}` | `base.html`, `header.html` |
| Responsive layout | `@media (max-width: 600px)` |
| JS enhancement | Focus on input, delete confirmation, character counter |

## Screenshots

| Home Page | Add Task |
|:-:|:-:|
| ![](<Experiment-15-Screenshots/Screenshot 1 — Home page.png>) | ![](<Experiment-15-Screenshots/Screenshot 2 — Add Task page.png>) |
| **Django Admin** | **Task Operations** |
| ![](<Experiment-15-Screenshots/Screenshot 3 — Django Admin.png>) | ![](<Experiment-15-Screenshots/Screenshot 4 — Task operations.png>) |

## Tests (14 Passing)

Covers model creation, task list view, add/toggle/delete via POST, CSRF rejection on GET, empty-list message and admin registration.

---

## Key Concepts

**`admin.py` vs `apps.py`:**
`admin.py` registers models with the admin site and customises how they are listed. `apps.py` holds the app configuration (`TodoConfig`: name, `verbose_name`, `ready()`); it is not for model registration.

**`extends` vs `include`:**
`{% extends 'todo/base.html' %}` is inheritance — the page fills the blocks of one parent layout. `{% include 'todo/header.html' %}` is composition — it inserts a small reusable piece.

---

<div align="center">

[Lab Index](../README.md) | [Repository Home](../../README.md)

</div>

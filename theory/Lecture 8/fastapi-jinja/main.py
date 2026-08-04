# ==========================================
# Lecture 8 - Server-side rendering with FastAPI + Jinja2
# Lab Exercise 3 (current date/time with {{ now }}) and 5 (image from static/images/)
# Run:  pip install -r requirements.txt  →  uvicorn main:app --reload  →  http://127.0.0.1:8000
# ==========================================

from datetime import datetime

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI(title="Lecture 8 - Jinja2 SSR")

# Exercise 5: everything inside ./static is served at /static/...
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


# Exercise 3: page that shows the current date and time
@app.get("/", response_class=HTMLResponse)
def show_time(request: Request):
    now = datetime.now().strftime("%d %B %Y, %I:%M:%S %p")
    return templates.TemplateResponse(request, "time.html", {"now": now})


# Exercise 5: page that displays an image from static/images/
@app.get("/gallery", response_class=HTMLResponse)
def gallery(request: Request):
    return templates.TemplateResponse(
        request,
        "gallery.html",
        {"image_name": "images/campus.svg", "caption": "Image served from the static/images folder"},
    )

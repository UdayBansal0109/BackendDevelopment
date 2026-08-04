from django.contrib.auth.decorators import login_required, permission_required
from django.core.cache import cache
from django.db.models import Count
from django.http import JsonResponse

from .models import Department, Student
from .utils import get_external_data


# ---------- Lecture 26 ----------
def index(request):
    return JsonResponse({
        "message": "Welcome to the Student Management API",
        "version": "1.0",
        "status": "running"
    })


# ---------- Lecture 27 / 29: health, list and detail ----------
def health_check(request):
    return JsonResponse({"status": "ok"})


def student_list(request):
    # Lecture 31: select_related (ForeignKey) + prefetch_related (ManyToMany)
    # → 2 queries in total, no matter how many students exist
    students = Student.objects.select_related("department").prefetch_related("courses")
    data = [
        {**s.to_dict(), "courses": [c.code for c in s.courses.all()]}
        for s in students
    ]
    return JsonResponse({"count": len(data), "students": data})


def student_list_unoptimized(request):
    # Lecture 31: the N+1 version kept for comparison (1 query + 2 per student)
    students = Student.objects.all()
    data = [
        {**s.to_dict(), "courses": [c.code for c in s.courses.all()]}
        for s in students
    ]
    return JsonResponse({"count": len(data), "students": data})


def student_detail(request, student_id):
    try:
        student = Student.objects.select_related("department").get(pk=student_id)
    except Student.DoesNotExist:
        return JsonResponse({"error": "Student not found"}, status=404)

    return JsonResponse({**student.to_dict(), "courses": [c.code for c in student.courses.all()]})


# ---------- Lecture 28: third-party API ----------
def external_data_view(request, post_id):
    result = get_external_data(post_id)

    if result["error"]:
        # 503: our API works, but a service it depends on is not available
        return JsonResponse({"error": result["error"]}, status=503)

    return JsonResponse(result["data"])


# ---------- Lecture 30: authentication and authorization ----------
@login_required
def secure_data_view(request):
    # Any logged-in user (identity is verified)
    return JsonResponse({"message": f"Hello {request.user.username}, you are logged in."})


@login_required
@permission_required("students.view_student", raise_exception=True)
def student_records_view(request):
    # Only users that have the "Can view student" permission (authorization)
    students = Student.objects.select_related("department")
    return JsonResponse({"students": [s.to_dict() for s in students]})


# ---------- Lecture 31: low-level cache for a public summary ----------
def student_summary_view(request):
    summary = cache.get("student-summary")
    cached = summary is not None

    if summary is None:
        summary = {
            "total_students": Student.objects.count(),
            "per_department": list(
                Department.objects.annotate(students_count=Count("students"))
                .values("name", "students_count").order_by("name")
            ),
        }
        cache.set("student-summary", summary, timeout=300)   # 5 minutes

    return JsonResponse({**summary, "from_cache": cached})

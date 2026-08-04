from unittest.mock import Mock, patch

import requests
from django.contrib.auth.models import Permission, User
from django.core.cache import cache
from django.test import SimpleTestCase, TestCase
from django.urls import reverse

from .models import Course, Department, Student
from .utils import get_external_data


# ---------- Lecture 26 / 29 (original test) ----------
class StudentAPITest(TestCase):
    def test_home_endpoint(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json()["message"],
            "Welcome to the Student Management API"
        )
        self.assertEqual(response.json()["status"], "running")


# ---------- Lecture 29: health, list and detail endpoints ----------
class StudentEndpointTests(TestCase):
    def setUp(self):
        self.dept = Department.objects.create(name="Computer Science")
        self.student = Student.objects.create(name="Aarav", email="aarav@example.com", department=self.dept)

    def test_health_endpoint(self):
        response = self.client.get(reverse("health-check"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_student_list(self):
        Student.objects.create(name="Diya", email="diya@example.com")
        response = self.client.get(reverse("student-list"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["count"], 2)
        self.assertEqual(response.json()["students"][0]["department"], "Computer Science")

    def test_student_detail(self):
        response = self.client.get(reverse("student-detail", kwargs={"student_id": self.student.id}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["name"], "Aarav")

    def test_student_detail_not_found(self):
        response = self.client.get(reverse("student-detail", kwargs={"student_id": 999}))
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()["error"], "Student not found")

    def test_middleware_adds_timing_header_and_logs(self):
        with self.assertLogs("students.requests", level="INFO") as logs:
            response = self.client.get(reverse("health-check"))
        self.assertIn("X-Response-Time-ms", response)
        self.assertIn("GET /api/health/ -> 200", logs.output[0])


# ---------- Lecture 29: model tests ----------
class StudentModelTests(TestCase):
    def test_str_and_to_dict(self):
        student = Student.objects.create(name="Rohan", email="rohan@example.com")
        self.assertEqual(str(student), "Rohan")
        self.assertIsNone(student.to_dict()["department"])

    def test_email_must_be_unique(self):
        from django.db import IntegrityError
        Student.objects.create(name="A", email="same@example.com")
        with self.assertRaises(IntegrityError):
            Student.objects.create(name="B", email="same@example.com")


# ---------- Lecture 28 / 29: external service with mocks (no internet needed) ----------
class ExternalServiceTests(SimpleTestCase):
    @patch("students.utils.requests.get")
    def test_success_returns_data(self, mock_get):
        mock_get.return_value = Mock(status_code=200)
        mock_get.return_value.json.return_value = {"id": 1, "title": "Test post"}
        mock_get.return_value.raise_for_status.return_value = None

        result = get_external_data(1)

        self.assertEqual(result, {"data": {"id": 1, "title": "Test post"}, "error": None})
        mock_get.assert_called_once_with("https://jsonplaceholder.typicode.com/posts/1", timeout=2)

    @patch("students.utils.requests.get", side_effect=requests.Timeout)
    def test_timeout_returns_safe_error(self, mock_get):
        self.assertEqual(get_external_data(1)["error"], "External service timed out")

    @patch("students.utils.requests.get", side_effect=requests.ConnectionError)
    def test_view_returns_503_when_service_down(self, mock_get):
        response = self.client.get(reverse("external-data", kwargs={"post_id": 1}))
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json()["error"], "External service is unavailable")


# ---------- Lecture 30: anonymous, regular and authorized users ----------
class SecurityTests(TestCase):
    def setUp(self):
        self.regular = User.objects.create_user("regular", password="Pass12345!")
        self.authorized = User.objects.create_user("teacher", password="Pass12345!")
        self.authorized.user_permissions.add(Permission.objects.get(codename="view_student"))

    def test_anonymous_is_redirected_to_login(self):
        response = self.client.get(reverse("secure-data"))
        self.assertEqual(response.status_code, 302)
        self.assertTrue(response["Location"].startswith("/accounts/login/?next=/secure-data/"))

    def test_regular_user_can_see_secure_data_but_not_records(self):
        self.client.login(username="regular", password="Pass12345!")
        self.assertEqual(self.client.get(reverse("secure-data")).status_code, 200)
        self.assertEqual(self.client.get(reverse("student-records")).status_code, 403)

    def test_authorized_user_can_see_records(self):
        self.client.login(username="teacher", password="Pass12345!")
        self.assertEqual(self.client.get(reverse("student-records")).status_code, 200)

    def test_login_page_works(self):
        self.assertEqual(self.client.get("/accounts/login/").status_code, 200)


# ---------- Lecture 31: query count and caching ----------
class PerformanceTests(TestCase):
    def setUp(self):
        cache.clear()
        dept = Department.objects.create(name="CSE")
        course = Course.objects.create(code="CS301", title="Backend Development")
        for i in range(10):
            s = Student.objects.create(name=f"Student {i}", email=f"s{i}@example.com", department=dept)
            s.courses.add(course)

    def test_unoptimized_list_has_n_plus_1_queries(self):
        # 1 query for students + 10 for departments + 10 for courses
        with self.assertNumQueries(21):
            self.client.get(reverse("student-list-unoptimized"))

    def test_optimized_list_uses_two_queries(self):
        # 1 query (students JOIN departments) + 1 query (prefetch courses)
        with self.assertNumQueries(2):
            response = self.client.get(reverse("student-list"))
        self.assertEqual(response.json()["count"], 10)

    def test_summary_is_cached(self):
        first = self.client.get(reverse("student-summary")).json()
        with self.assertNumQueries(0):
            second = self.client.get(reverse("student-summary")).json()
        self.assertFalse(first["from_cache"])
        self.assertTrue(second["from_cache"])
        self.assertEqual(second["total_students"], 10)

    def test_cached_summary_can_be_stale(self):
        self.client.get(reverse("student-summary"))
        Student.objects.create(name="New", email="new@example.com")
        stale = self.client.get(reverse("student-summary")).json()
        self.assertEqual(stale["total_students"], 10)      # still old value until it expires
        cache.delete("student-summary")                    # invalidation
        fresh = self.client.get(reverse("student-summary")).json()
        self.assertEqual(fresh["total_students"], 11)

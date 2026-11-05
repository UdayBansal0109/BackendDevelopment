from django.test import TestCase


class StudentAPITest(TestCase):
    def test_home_endpoint(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json()["message"],
            "Welcome to the Student Management API"
        )
        self.assertEqual(response.json()["status"], "running")
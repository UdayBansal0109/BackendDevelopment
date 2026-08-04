from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from .models import Task


class TaskModelTest(TestCase):
    def test_new_task_is_incomplete(self):
        task = Task.objects.create(title="Write tests")
        self.assertFalse(task.completed)
        self.assertEqual(str(task), "Write tests")


class TaskViewTest(TestCase):
    def test_empty_list_shows_message(self):
        response = self.client.get(reverse("task_list"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No tasks yet")

    def test_list_shows_tasks(self):
        Task.objects.create(title="Buy milk")
        response = self.client.get(reverse("task_list"))
        self.assertContains(response, "Buy milk")

    def test_add_task(self):
        response = self.client.post(reverse("add_task"), {"title": "New task"})
        self.assertRedirects(response, reverse("task_list"))
        self.assertTrue(Task.objects.filter(title="New task").exists())

    def test_blank_title_is_not_saved(self):
        self.client.post(reverse("add_task"), {"title": "   "})
        self.assertEqual(Task.objects.count(), 0)

    def test_toggle_task(self):
        task = Task.objects.create(title="Toggle me")
        self.client.post(reverse("toggle_task", args=[task.id]))
        task.refresh_from_db()
        self.assertTrue(task.completed)

    def test_delete_task(self):
        task = Task.objects.create(title="Delete me")
        self.client.post(reverse("delete_task", args=[task.id]))
        self.assertFalse(Task.objects.filter(id=task.id).exists())

    def test_delete_requires_post(self):
        task = Task.objects.create(title="Keep me")
        response = self.client.get(reverse("delete_task", args=[task.id]))
        self.assertEqual(response.status_code, 405)
        self.assertTrue(Task.objects.filter(id=task.id).exists())


class TemplateAndStaticTest(TestCase):
    def test_pages_use_base_header_and_footer(self):
        for name in ["task_list", "add_task"]:
            response = self.client.get(reverse(name))
            self.assertTemplateUsed(response, "todo/base.html")
            self.assertTemplateUsed(response, "todo/header.html")
            self.assertTemplateUsed(response, "todo/footer.html")

    def test_forms_contain_csrf_token(self):
        Task.objects.create(title="CSRF check")
        response = self.client.get(reverse("task_list"))
        self.assertContains(response, "csrfmiddlewaretoken")

    def test_static_files_are_linked(self):
        response = self.client.get(reverse("task_list"))
        self.assertContains(response, "todo/css/style.css")
        self.assertContains(response, "todo/js/app.js")
        self.assertContains(response, 'alt="Task Tracker logo"')

    def test_add_page_uses_extra_js_block(self):
        response = self.client.get(reverse("add_task"))
        self.assertContains(response, "charCount")

    def test_static_logo_file_is_found(self):
        from django.contrib.staticfiles import finders
        self.assertIsNotNone(finders.find("todo/images/logo.png"))


class AdminTest(TestCase):
    def test_admin_task_list_has_search_and_filter(self):
        User.objects.create_superuser("admin", "admin@example.com", "test-pass-123")
        self.client.login(username="admin", password="test-pass-123")
        Task.objects.create(title="Admin task")
        response = self.client.get("/admin/todo/task/")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Admin task")
        self.assertContains(response, 'id="searchbar"')
        self.assertContains(response, "By completed")

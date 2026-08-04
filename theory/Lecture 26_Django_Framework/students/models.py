from django.db import models


class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Course(models.Model):
    code = models.CharField(max_length=10, unique=True)
    title = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.code} - {self.title}"


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    # ForeignKey (single-valued) → optimise with select_related()   (Lecture 31)
    department = models.ForeignKey(Department, on_delete=models.PROTECT, related_name="students",
                                   null=True, blank=True)
    # ManyToMany (multi-valued) → optimise with prefetch_related()  (Lecture 31)
    courses = models.ManyToManyField(Course, related_name="students", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "department": self.department.name if self.department else None,
        }

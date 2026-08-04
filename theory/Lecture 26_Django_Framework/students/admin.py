from django.contrib import admin

from .models import Course, Department, Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "department")
    list_filter = ("department",)
    search_fields = ("name", "email")
    # avoid N+1 queries in the admin list page as well
    list_select_related = ("department",)


admin.site.register(Department)
admin.site.register(Course)

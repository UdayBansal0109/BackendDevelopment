
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    # Lecture 30: login / logout views provided by Django
    path('accounts/', include('django.contrib.auth.urls')),
    path('', include('students.urls')),
]


from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),

    # Lecture 27: app-level routes (fixed and parameterized)
    path('api/health/', views.health_check, name='health-check'),
    path('api/students/', views.student_list, name='student-list'),
    path('api/students/<int:student_id>/', views.student_detail, name='student-detail'),

    # Lecture 28: third-party API
    path('api/students/external/<int:post_id>/', views.external_data_view, name='external-data'),

    # Lecture 31: N+1 comparison and cached summary
    path('api/students/unoptimized/', views.student_list_unoptimized, name='student-list-unoptimized'),
    path('api/students/summary/', views.student_summary_view, name='student-summary'),

    # Lecture 30: login_required and permission_required views
    path('secure-data/', views.secure_data_view, name='secure-data'),
    path('student-records/', views.student_records_view, name='student-records'),
]

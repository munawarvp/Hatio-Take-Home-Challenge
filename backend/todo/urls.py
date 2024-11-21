from django.urls import path

from todo.views import RegisterView, LoginView, ProjectView, TaskView, TaskUpdateView, ProjectSummaryView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),

    path('project', ProjectView.as_view()),
    path('task', TaskView.as_view()),
    path('task-update', TaskUpdateView.as_view()),
    path('project-summary', ProjectSummaryView.as_view()),
]
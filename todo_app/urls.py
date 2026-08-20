from django.urls import path
from . import views

urlpatterns = [
    # /api/tasks/     -> list all tasks or create a new one
    path("tasks/", views.task_list, name="task_list"),
    # /api/tasks/1/   -> get, update, or delete one task
    path("tasks/<int:task_id>/", views.task_detail, name="task_detail"),
]

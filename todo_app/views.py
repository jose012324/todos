import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Task


# Helper: turn a Task object into a plain dictionary (for JSON response)
def task_to_dict(task):
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "completed": task.completed,
        "created_at": task.created_at.isoformat(),
    }


# GET /api/tasks/  - List all tasks (with optional search and filter)
# POST /api/tasks/ - Create a new task
@csrf_exempt
def task_list(request):
    # --- CREATE a new task ---
    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        title = data.get("title", "").strip()
        if not title:
            return JsonResponse({"error": "Title is required"}, status=400)

        description = data.get("description", "").strip()

        task = Task.objects.create(title=title, description=description)
        return JsonResponse(task_to_dict(task), status=201)

    # --- LIST all tasks (GET) ---
    tasks = Task.objects.all().order_by("-created_at")

    # Search: filter by title if ?search=xxx is in the URL
    search = request.GET.get("search", "").strip()
    if search:
        tasks = tasks.filter(title__icontains=search)

    # Filter: show only completed or incomplete tasks
    # ?status=completed  or  ?status=incomplete
    status = request.GET.get("status", "").strip()
    if status == "completed":
        tasks = tasks.filter(completed=True)
    elif status == "incomplete":
        tasks = tasks.filter(completed=False)

    # Convert queryset to list of dicts
    task_list = [task_to_dict(t) for t in tasks]
    return JsonResponse(task_list, safe=False)


# GET /api/tasks/1/    - Get one task
# PUT /api/tasks/1/    - Update a task (title, description, completed)
# DELETE /api/tasks/1/ - Delete a task
@csrf_exempt
def task_detail(request, task_id):
    # Find the task or return 404
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return JsonResponse({"error": "Task not found"}, status=404)

    # --- GET one task ---
    if request.method == "GET":
        return JsonResponse(task_to_dict(task))

    # --- UPDATE a task ---
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        # Only update fields that were sent
        if "title" in data:
            title = data["title"].strip()
            if not title:
                return JsonResponse({"error": "Title cannot be empty"}, status=400)
            task.title = title

        if "description" in data:
            task.description = data["description"].strip()

        if "completed" in data:
            task.completed = data["completed"]

        task.save()
        return JsonResponse(task_to_dict(task))

    # --- DELETE a task ---
    if request.method == "DELETE":
        task.delete()
        return JsonResponse({"message": "Task deleted"}, status=200)

    return JsonResponse({"error": "Method not allowed"}, status=405)

from django.contrib import admin
from .models import Task

# Register Task model so it shows up in Django admin panel
admin.site.register(Task)

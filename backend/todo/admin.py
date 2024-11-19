from django.contrib import admin

from todo.models import Project, Todo

# Register your models here.
admin.site.register(Project)
admin.site.register(Todo)
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response

from todo.models import Project, Todo
from todo.serializers import ProjectSerializer, TodoSerializer

# Create your views here.

class LoginView(APIView):
    def post(self, request):
        try:
            data = request.data
            user = authenticate(username=data["username"], password=data["password"])
            if user:
                return Response({"success": True, "message": "User logged in successfully", "data": {"user_id": user.id}}, status=200)
            return Response({"success": False, "message": "User Login Failed"}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)


class RegisterView(APIView):
    def post(self, request):
        try:
            data = request.data

            user = User.objects.create_user(
                username=data["username"],
                email=data["email"]
            )
            user.set_password(data["password"])
            user.save()
            return Response({"success": True, "message": "User created successfully"}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)


class ProjectView(APIView):
    def get(self, request):
        try:
            user_id = request.GET.get("user_id")
            if not user_id:
                return Response({"success": False, "message": "User not logged in"}, status=400)
            
            projects = Project.objects.filter(user_id=user_id)
            return Response({"success": True, "data": ProjectSerializer(projects, many=True).data}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
        
    def post(self, request):
        try:
            user_id = request.GET.get("user_id")
            if not user_id:
                return Response({"success": False, "message": "User not logged in"}, status=400)
            data = request.data
            user = User.objects.get(id=user_id)
            project = Project.objects.create(user=user, title=data["title"])
            return Response({"success": True, "message": "Project created successfully", "data": ProjectSerializer(project).data}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
        
    
    def put(self, request):
        try:
            user_id = request.GET.get("user_id")
            if not user_id:
                return Response({"success": False, "message": "User not logged in"}, status=400)
            project_id = request.GET.get("project_id")
            data = request.data
            project = Project.objects.get(id=project_id)
            project.title = data["title"]
            project.save()
            return Response({"success": True, "message": "Project updated successfully"}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
        

    def delete(self, request):
        try:
            user_id = request.GET.get("user_id")
            if not user_id:
                return Response({"success": False, "message": "User not logged in"}, status=400)
            project_id = request.GET.get("project_id")
            project = Project.objects.get(id=project_id)
            project.delete()
            return Response({"success": True, "message": "Project deleted successfully"}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
        

class TaskView(APIView):

    def post(self, request):
        try:
            user_id = request.GET.get("user_id")
            data = request.data
            if not user_id:
                return Response({"success": False, "message": "User not logged in"}, status=403)
            
            project_id = request.GET.get("project_id")
            project = Project.objects.get(id=project_id)
            todo = Todo.objects.create(project=project, description=data["description"])
            return Response({"success": True, "message": "Todo created successfully", "data": TodoSerializer(todo).data}, status=200)
        
        except Project.DoesNotExist:
            return Response({"success": False, "message": "Project not found"}, status=404)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
        

    def get(self, request):
        try:
            user_id = request.GET.get("user_id")
            if not user_id:
                return Response({"success": False, "message": "User not logged in"}, status=403)
            
            project_id = request.GET.get("project_id")
            project = Project.objects.get(id=project_id)
            todos = Todo.objects.filter(project=project)
            return Response({"success": True, "data": TodoSerializer(todos, many=True).data}, status=200)
        except Project.DoesNotExist:
            return Response({"success": False, "message": "Project not found"}, status=404)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
        

class TaskUpdateView(APIView):

    def get(self, request):
        try:
            user_id = request.GET.get("user_id")
            if not user_id:
                return Response({"success": False, "message": "User not logged in"}, status=403)
            
            todo_id = request.GET.get("todo_id")
            todo = Todo.objects.get(id=todo_id)
            todo.status = not todo.status
            todo.save()
            return Response({"success": True, "message": "Todo updated successfully", "data": TodoSerializer(todo).data}, status=200)
        except Todo.DoesNotExist:
            return Response({"success": False, "message": "Todo not found"}, status=404)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
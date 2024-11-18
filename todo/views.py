from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class LoginView(APIView):
    def post(self, request):
        try:
            data = request.data
            user = authenticate(username=data["username"], password=data["password"])
            if user:
                return Response({"success": True, "message": "User logged in successfully"}, status=200)
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

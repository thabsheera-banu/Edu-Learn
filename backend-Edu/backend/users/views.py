# from django.shortcuts import render
# from rest_framework.views import APIView
# from . models import Teacher
# from . serializers import TeacherSerializers
# from rest_framework.response import Response
from rest_framework import generics 


# Create your views here.

# class TeacherList(APIView):
#     def get(self,request,format=None):
#         teacher=Teacher.objects.all()
#         serializer=TeacherSerializers(teacher,many=True)
#         return Response(serializer.data)

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Add custom claims
#         token['username'] = user.username
#         token['is_admin'] = user.is_superuser
        
#         # ...

#         return token


# # class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

 # using generics we can get and post the list
# class TeacherList(generics.ListCreateAPIView):
#     queryset = Teacher.objects.all()
#     serializer_class = TeacherSerializers

# using this method add delete update ..

# class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Teacher.objects.all()
#     serializer_class = TeacherSerializers


# @csrf_exempt
# def teacher_login(request):
#     email = request.POST.get('email', '')
#     password = request.POST.get('password', '')
#     print(email, "email", password, "password")
#     user = authenticate(request, email=email, password=password)
#     print("user object", user)
#     if user is not None:
#         print("user is not none")
#         login(request, user)
#         refresh_token = str(RefreshToken.for_user(user))
#         access_token = str(AccessToken.for_user(user))
        
#         return Response({
#             'access_token': access_token,
#             'refresh_token': refresh_token,
#         })
    
#     return Response({'success': False})

# @csrf_exempt
# def teacher_login( request):
#     email = request.data["email"]
#     password = request.data["password"]
#     print(email, password)
#     print("Received from React", email, password)
    
#     try:
#         user = Teacher.objects.get(email = email)
#     except Teacher.DoesNotExist:
#         raise AuthenticationFailed("Account does  not exist")
#     print("user object", user)
#     if user is None:
#         raise AuthenticationFailed("User does not exist")
#     if not user.check_password(password):
#         raise AuthenticationFailed("Incorrect Password")
#     access_token = str(AccessToken.for_user(user))
#     refresh_token = str(RefreshToken.for_user(user))
#     return Response({
#         "access_token" : access_token,
#         "refresh_token" : refresh_token
#     })


from rest_framework.views import APIView
from .serializers import TeacherSerializers,StudentSerializers,StudentDashboardSerializer
from rest_framework.response import Response
from .models import Teacher, Student
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

# class RegisterView(APIView):
#     def post(self, request):
#         serializer = TeacherSerializers(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         print('serializer',serializer.data)
#         return Response(serializer.data)

class TeacherRegisterView(APIView):
    def post(self, request):
        serializer = TeacherSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"success": True, "message": "Registration Successful. Verify Email"},
                            status=status.HTTP_201_CREATED)
        else:
            errors = {}
            for field, field_errors in serializer.errors.items():
                # Customize the error messages based on the field
                if field == 'email' and 'unique' in field_errors:
                    errors[field] = "Email already exists."
                elif field == 'password':
                    errors[field] = "Invalid password."
                else:
                    errors[field] = field_errors[0]  # Use the first error message

            return Response({"success": False, "errors": errors}, status=status.HTTP_400_BAD_REQUEST)



class TeacherLoginView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        print("Received from React", email, password)
        
        try:
            user = Teacher.objects.get(email = email)
        except Teacher.DoesNotExist:
            raise AuthenticationFailed("Account does  not exist")

        if user is None:
            raise AuthenticationFailed("User does not exist")
        # if user.blocked:
        #     raise AuthenticationFailed("Account is blocked")
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password")
        if user.is_active:
            access_token = str(AccessToken.for_user(user))
            refresh_token = str(RefreshToken.for_user(user))
            return Response({
                "access_token" : access_token,
                "refresh_token" : refresh_token,
                "teacher_id":user.id,
                "teacherloginStatus" : 'true',
            })
        else:
            raise AuthenticationFailed("You are blocked")
        




#admin login
class AdminLoginView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        print("Received from React", email, password)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("Account does not exist")

        if user is None:
            print ('None')
            raise AuthenticationFailed("User does not exist")
        if not user.check_password(password):
            print('no password')
            raise AuthenticationFailed("Incorrect Password")
        if not user.is_superuser:
            print('not superuser')
            raise AuthenticationFailed("User is not a superuser")  # Add the condition to check if the user is a superuser

        access_token = str(AccessToken.for_user(user))
        refresh_token = str(RefreshToken.for_user(user))
        return Response({
            "access_token": access_token,
            "refresh_token": refresh_token
        })

    

class StudentRegisterView(APIView):
    def post(self, request):
        serializer = StudentSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"success": True, "message": "Registration Successful. Verify Email"},
                            status=status.HTTP_201_CREATED)
        else:
            errors = {}
            for field, field_errors in serializer.errors.items():
                # Customize the error messages based on the field
                if field == 'email' and 'unique' in field_errors:
                    errors[field] = "Email already exists."
                elif field == 'password':
                    errors[field] = "Invalid password."
                else:
                    errors[field] = field_errors[0]  # Use the first error message

            return Response({"success": False, "errors": errors}, status=status.HTTP_400_BAD_REQUEST)



# class StudentLoginView(APIView):
#     def check_password(self, user, password):
#         if not check_password(password, user.password):
#             raise AuthenticationFailed("Incorrect Password")

#     def post(self, request):
#         email = request.data["email"]
#         password = request.data["password"]
#         print("Received from React", email, password)

#         try:
#             user = Student.objects.get(email=email)
#         except Student.DoesNotExist:
#             raise AuthenticationFailed("Account does not exist")

#         if user is None:
#             raise AuthenticationFailed("User does not exist")

#         self.check_password(user, password)  # Call the check_password function

#         access_token = str(AccessToken.for_user(user))
#         refresh_token = str(RefreshToken.for_user(user))
#         return Response({
#             "access_token": access_token,
#             "refresh_token": refresh_token
#         })
class StudentLoginView(APIView):
    def check_password(self, user, password):
        if not check_password(password, user.password):
            raise AuthenticationFailed("Incorrect Password")

    def post(self, request):
        email = request.data.get("email")  # Use get method with a default value
        password = request.data.get("password")
        print("Received from React", email, password)

        if email is None or password is None:
            raise AuthenticationFailed("Email and password are required")

        try:
            user = Student.objects.get(email=email)
        except Student.DoesNotExist:
            raise AuthenticationFailed("Account does not exist")
        if user.blocked:
            raise AuthenticationFailed("Account is blocked")

        self.check_password(user, password)  # Call the check_password function

        access_token = str(AccessToken.for_user(user))
        refresh_token = str(RefreshToken.for_user(user))
        return Response({
            "studentLoginstatus" : True,
            "student_id" :user.id,
            "student" :user.full_name,
            "access_token": access_token,
            "refresh_token": refresh_token
        })


class StudentDashboard(generics.RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentDashboardSerializer
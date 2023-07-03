from django.urls import path
from .views import TeacherLoginView, TeacherRegisterView,StudentRegisterView, AdminLoginView , StudentLoginView 




urlpatterns = [
    
    path('register', TeacherRegisterView.as_view()),
    path('teacherlogin', TeacherLoginView.as_view() ),

    # Student
    path('student-register',StudentRegisterView.as_view()),
    path('admin-login',AdminLoginView.as_view()),
    path('studentlogin', StudentLoginView.as_view() ),

    
]

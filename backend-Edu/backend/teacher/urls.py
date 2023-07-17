from . import views
from django.urls import path

urlpatterns = [
    path('teacher-list',views.TeacherList.as_view()),
    path('teacher-detail/<int:pk>',views.TeacherDetail.as_view()),
    path('user-block-unblock-view/', views.BlockUnBlockUserView.as_view(), name='user-block-unblock-view'),
    path('send-msg/<int:teacher_id>/<int:student_id>',views.TeacherStudentMsg),
    path('get-msg/<int:teacher_id>/<int:student_id>',views.MessageList.as_view()),
    path('student-detail/<int:pk>',views.StudentDetail.as_view()),





]

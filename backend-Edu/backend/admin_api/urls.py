from .  import  views
from django.urls import path

urlpatterns = [
    path('student-list',views.StudentList.as_view()),
    path('block-student/<int:pk>', views.BlockStudentView.as_view(), name='block-student'),
    path('unblock-student/<int:pk>', views.UnblockStudentView.as_view(), name='unblock-student'),

    
]

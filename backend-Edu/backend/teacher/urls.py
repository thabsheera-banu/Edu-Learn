from . import views
from django.urls import path

urlpatterns = [
    path('teacher-list',views.TeacherList.as_view()),
    path('teacher-detail/<int:pk>',views.TeacherDetail.as_view()),
    path('user-block-unblock-view/', views.BlockUnBlockUserView.as_view(), name='user-block-unblock-view')



]

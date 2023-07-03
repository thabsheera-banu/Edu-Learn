from . import views
from django.urls import path

urlpatterns = [
    path(" ",views.index,name='index'),
    path("category/",views.CategoryList.as_view()),
    path("course/",views.CourseList.as_view()),
    path("teacher-corses/<int:pk>/",views.CourceDetail.as_view()),
    path('tutor-corse/<int:teacher_id>',views.TeacherCourseList.as_view()),
    #course Detail
    path('teacher-cource-detail/<int:pk>',views.TeacherCourceDetail.as_view()),
    #chapter
    path('chapter/' ,views.ChapterList.as_view()),
    path('chapter/<int:pk>',views.ChapterDetailView.as_view()),
    #specific cource chapter
    path('course-chapter/<int:course_id>',views.CourceChapterList.as_view()),
    path('student-entroll-course',views.StudentEntrollCourseList.as_view()),
    path('fetch-entroll-status/<int:student_id>/<int:course_id>' ,views.fetch_entroll_status),

    #payment
    path('razorpay/pay/', views.start_payment, name="payment"),





    
]

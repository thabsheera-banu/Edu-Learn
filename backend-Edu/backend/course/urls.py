from . import views
from django.urls import path

urlpatterns = [
    path(" ",views.index,name='index'),
    path("category/",views.CategoryList.as_view()),
    path("category/<int:pk>",views.CategoryUpdate.as_view()),

    path("course/",views.CourseList.as_view()),
    # search Course
    path("search/<str:searchstring>",views.CourseList.as_view()),
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
    path('fetch-entrolled-students/<int:course_id>' ,views.EntrolledStudentList.as_view()),
    path('fetch-entrolled-course/<int:student_id>' ,views.EntrolledStudentList.as_view()),
    path('fetch-all-entrolled-students/<int:teacher_id>' ,views.EntrolledStudentList.as_view()),
    path('fetch-my-teachers/<student_id>',views.MyTeacherList.as_view()),
    # path('student-testimonial',views.CourseRatingList.as_view()),



    #payment
    path('razorpay/pay/', views.start_payment, name="payment"),
    path('payment/success/', views.handle_payment_success, name="payment_success"),
    path('free_entroll/',views.FreeEntroll.as_view()),







    
]

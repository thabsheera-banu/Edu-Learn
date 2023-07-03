from django.contrib import admin
from . models import Course,Chapter,CourseCategory ,StudentCourseEntrollment

# Register your models here.
admin.site.register(Course )
admin.site.register(Chapter)
admin.site.register(CourseCategory)
admin.site.register(StudentCourseEntrollment)

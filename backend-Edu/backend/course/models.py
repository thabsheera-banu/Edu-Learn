from django.db import models
from django.core import serializers
from users.models import Teacher , Student

# Create your models here.

#Cource Category

class CourseCategory(models.Model):
    title=models.CharField(max_length=100)
    detail=models.TextField()

    def __str__(self):
        return self.title
    
#course

class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    img=models.ImageField(upload_to='course_image/',null=True)
    description=models.TextField()
    techs=models.TextField(null=True)
    price=models.IntegerField(default=0)

    # class Meta:
    #     db_table = ''

    def __str__(self):
        return self.title
    
    def related_videos(self):
        related_videos =Course.objects.filter(techs__icontains = self.techs)
        return serializers.serialize('json',related_videos)

# chapters

class Chapter(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE ,related_name='course_chapters' )
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to="chapter_video/",null=True)
    remarks = models.TextField(null=True)

# entrolled students

class StudentCourseEntrollment(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE ,related_name='entrolled_course')
    student = models.ForeignKey(Student , on_delete=models.CASCADE ,related_name ='entrolled_student')
    order_amount=models.CharField(max_length=25,blank=True)
    order_payment_id =models.CharField(max_length=100,blank=True)
    order_date  =models.DateTimeField(auto_now=True)
    isPaid = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    entrolled_time = models.DateTimeField(auto_now_add=True )
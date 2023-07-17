from django.db import models
from users.models import Teacher,Student

# Create your models here.

# Message
class TeacherStudentChat(models.Model):
    teacher = models.ForeignKey(Teacher , on_delete = models.CASCADE)
    student = models.ForeignKey(Student , on_delete = models.CASCADE)
    msg_text = models.TextField()
    msg_from = models.CharField(max_length=100)
    msg_time = models.DateTimeField(auto_now=True)
    

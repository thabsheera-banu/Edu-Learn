from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, AbstractBaseUser

# Create your models here.
from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def _create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self._create_user(email, password, **extra_fields)
    
class StudentManager(BaseUserManager):
    def _create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)
    
class Teacher(AbstractBaseUser):
    full_name = models.CharField(max_length=250)
    email = models.CharField(max_length=250, unique=True)
    password = models.CharField(max_length=250,blank=True,null=True)
    qualification=models.CharField(max_length=100)
    mobile_no=models.CharField(max_length=20)
    skills=models.TextField()
    profile_img = models.ImageField(upload_to ='teacher_profile_img',null=True)
    is_active = models.BooleanField(default=True)
    blocked = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    username = None
    first_name = None
    last_name = None
    objects = UserManager()
    class Meta:
        db_table = 'teacher'

    def __str__(self) -> str:
        return self.email

    #student Details

class Student(models.Model):
    full_name = models.CharField(max_length=250)
    email = models.CharField(max_length=250, unique=True)
    password = models.CharField(max_length=250,blank=True,null=True)
    qualification=models.CharField(max_length=100)
    mobile_no=models.CharField(max_length=20)
    intrested_category=models.TextField()
    profile_img = models.ImageField(upload_to ='student_profile_img',null=True)
    is_active = models.BooleanField(default=False)
    blocked = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    username = None
    first_name = None
    last_name = None
    class Meta:
        db_table = 'student'

    def __str__(self) -> str:
        return self.full_name
    
    #total Entrolled courses
    def entrolled_courses(self):
        from course.models import StudentCourseEntrollment
        entrolled_courses = StudentCourseEntrollment.objects.filter(student=self).count()
        return entrolled_courses 
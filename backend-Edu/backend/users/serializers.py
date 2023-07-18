

# class TeacherSerializers(serializers.ModelSerializer):
#     class Meta:
#         model=models.Teacher
#         fields=['id','full_name','email','password','qualification','mobile_no','skills']

from rest_framework import serializers
from .models import Teacher,Student

# class TeacherSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = Teacher
#         fields = ['id', 'username', 'email', 'password']

class TeacherSerializers(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id','full_name',  'email', 'password', 'qualification','mobile_no', 'skills','profile_img','blocked']
        # extra_kwargs = {
        #     'password': {'write_only': True}
        # } 
        
    def create(self, validated_data):
        password = validated_data.pop("password")
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

 #student serializer   
from django.contrib.auth.hashers import make_password

class StudentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id','full_name', 'email', 'password', 'qualification', 'mobile_no', 'intrested_category','profile_img', 'is_active','blocked','entrolled_courses']

    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data['password'] = make_password(password)
        instance = self.Meta.model.objects.create(**validated_data)
        return instance

class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['entrolled_courses']
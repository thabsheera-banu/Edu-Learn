from rest_framework import serializers
from . models import TeacherStudentChat

class TeacherStudentChatserializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherStudentChat
        fields = ['id' , 'teacher' ,'student' ,'msg_text' ,'msg_from' , 'msg_time']
        
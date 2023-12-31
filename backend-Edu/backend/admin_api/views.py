from django.shortcuts import render
from rest_framework import generics
from users.models import Student , Teacher
from users.serializers import StudentSerializers
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

# Create your views here.

class StudentList(generics.ListCreateAPIView):
    queryset=Student.objects.all()
    serializer_class=StudentSerializers

class BlockStudentView(APIView):
    def post(self, request, pk):
        print("stu id ",pk)
        student = get_object_or_404(Student, id=pk)
        student.blocked = True
        student.save()
        return Response({'message': 'Student blocked successfully'})

class UnblockStudentView(APIView):
    def post(self, request, pk):
        student = get_object_or_404(Student, id=pk)
        student.blocked = False
        student.save()
        return Response({'message': 'Student unblocked successfully'})
    
class TeacherBlockView(APIView):
    def post(self,request,pk):
        teacher = get_object_or_404(Teacher , id=pk)
        teacher.blocked = True
        teacher.save()
        return Response({'message' : 'Teacher blocked successfully'})
    
class TeacherUnBlockView(APIView):
    def post(self,request,pk):
        teacher = get_object_or_404(Teacher , id=pk)
        teacher.blocked = False
        teacher.save()
        return Response({'message' : 'Teacher unblocked successfully'})
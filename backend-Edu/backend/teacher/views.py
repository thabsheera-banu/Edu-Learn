from django.shortcuts import render
from rest_framework import generics
from users.models import Teacher
from users.serializers import TeacherSerializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view

# Create your views here.

# all teacherlist

class TeacherList(generics.ListCreateAPIView):
    queryset=Teacher.objects.all()
    serializer_class=TeacherSerializers

# All teacher Details

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Teacher.objects.all()
    serializer_class=TeacherSerializers
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True

        # Exclude 'is_active' field from update_fields
        update_fields = [field for field in request.data.keys() if field != 'is_active']

        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer, update_fields=update_fields)

        return Response(serializer.data)

#Block

class BlockUnBlockUserView(APIView):
    # permission_classes = [IsAdminUser]

    def post(self, request:Response):
        user_id = request.query_params['user_id']
        try:
            instance = Teacher.objects.get(id = user_id)
            instance.is_active = not instance.is_active
            instance.save()

            return Response({"message": "User status changed"}, status=status.HTTP_200_OK)
        
        except :
            return Response({"message": "user not found"}, status=status.HTTP_400_BAD_REQUEST)

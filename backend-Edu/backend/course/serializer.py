from rest_framework import serializers
from . models import CourseCategory,Course, Chapter ,StudentCourseEntrollment





class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ['id', 'title','detail']

# class CourseSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = ['id', 'category','teacher','title','img','description','techs','course_chapters']
#         depth = 1
    

class CourseSerializers(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ['id', 'category', 'teacher', 'title', 'img', 'description', 'techs', 'course_chapters','related_videos','price']
        depth = 1

    # def create(self, validated_data):
    #     category_id = validated_data.pop('category_id')
    #     category = CourseCategory.objects.get(id=category_id)
    #     validated_data['category'] = category
    #     return super().create(validated_data)

# chapter serializer

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id' , 'course' , 'title' , 'description' , 'video' ,'remarks']

class StudentCourseEntrollSerializers(serializers.ModelSerializer):
    class Meta:
        model = StudentCourseEntrollment
        fields = ['id', 'course','student' ,'entrolled_time']

class OrderSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = StudentCourseEntrollment
        fields = '__all__'
        depth = 1

class FreeOrderSerialzer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourseEntrollment
        fields = '__all__'
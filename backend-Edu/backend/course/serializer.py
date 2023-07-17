from rest_framework import serializers
from rest_framework.fields import empty
from . models import CourseCategory,Course, Chapter ,StudentCourseEntrollment





class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ['id', 'title','detail','total_courses']

# class CourseSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = ['id', 'category','teacher','title','img','description','techs','course_chapters']
#         depth = 1
    

class CourseSerializers(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ['id', 'category', 'teacher', 'title', 'img', 'description', 'techs', 'course_chapters','related_videos','price','total_entrolled_students']
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
        # depth = 1
    def __init__(self, *args ,**kwargs):
        super(StudentCourseEntrollSerializers,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class OrderSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = StudentCourseEntrollment
        fields = '__all__'
        depth = 1

class FreeOrderSerialzer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourseEntrollment
        fields = '__all__'
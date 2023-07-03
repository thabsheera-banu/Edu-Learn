
from django.shortcuts import render
from  rest_framework import generics,status
from . models import CourseCategory,Course,Chapter ,StudentCourseEntrollment
from users.models import Teacher ,Student
from . serializer import CategorySerializers,CourseSerializers,ChapterSerializer ,StudentCourseEntrollSerializers ,OrderSerializer
from rest_framework.response import Response
from django.http import JsonResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.conf  import settings
import razorpay




# Create your views here.
def index(request):
    pass

class CategoryList(generics.ListCreateAPIView):
    queryset=CourseCategory.objects.all()
    serializer_class=CategorySerializers

class  CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializers
    def perform_create(self, serializer):
        category_id = self.request.data.get('category')
        category = CourseCategory.objects.get(id=category_id)
        serializer.save(category=category)   
    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit =int(self.request.GET['result'])
            qs =Course.objects.all().order_by('-id')[:limit]
        return qs



# class CourseList(generics.ListCreateAPIView):
#     queryset=Course.objects.all()
#     print("queryset",queryset)

#     serializer_class=CourseSerializers
#     def get_queryset(self):
#         qs = super().get_queryset()
#         if 'result' in self.request.GET:
#             qs = Course.objects.all().order_by('-id')[:4]
#         print("qs", qs)
#         return qs

# class CourseList(generics.ListCreateAPIView):
#     serializer_class = CourseSerializers

#     def get_queryset(self):
#         from .models import Course  # Import locally within the method
#         qs = super().get_queryset()
#         if 'result' in self.request.GET:
#             qs = Course.objects.all().order_by('-id')[:4]
#         print("qs", qs)
#         return qs

# class CourseList(generics.ListCreateAPIView):
#     serializer_class = CourseSerializers

#     def get_queryset(self):
#         queryset = Course.objects.all()
#         if 'result' in self.request.GET:
#             queryset = Course.objects.all().order_by('-id')[:4]
#         return queryset

# class CourseList(generics.ListCreateAPIView):
#     serializer_class = CourseSerializers

#     def get_queryset(self):
#         queryset = Course.objects.all()
#         if 'result' in self.request.GET:
#             queryset = Course.objects.all().order_by('-id')[:4]
#         return queryset

#     def create(self, request, *args, **kwargs):
#         try:
#             # Print the incoming request body
#             print("Incoming request body:", request.data)

#             # Call the parent's create method to perform the default create behavior
#             return super().create(request, *args, **kwargs)
#         except Exception as e:
#             # Print any errors that occur during the create process
#             print("Error during course creation:", str(e))
#             raise



class CourceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class=CourseSerializers
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class=CourseSerializers
    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=Teacher.objects.get(pk=teacher_id)
        return Course.objects.filter(teacher=teacher)
    
class TeacherCourceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializers
    
class ChapterList(generics.ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

# specific cource

class CourceChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = Course.objects.get(pk=course_id)
        return Chapter.objects.filter(course=course)
    

class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

class StudentEntrollCourseList(generics.ListCreateAPIView):
    queryset = StudentCourseEntrollment.objects.all()
    serializer_class = StudentCourseEntrollSerializers


def fetch_entroll_status(request,student_id,course_id):
    student = Student.objects.filter(id=student_id).first()
    course  =Course.objects.filter(id = course_id).first()
    entrolstatus = StudentCourseEntrollment.objects.filter(course=course,student = student).count()
    
    if entrolstatus:
        return JsonResponse({
            'bool':True,
        
        })
    else:
        return JsonResponse({
            'bool' : False

        })
    

@api_view(['POST'])
def start_payment(request):
    
    print(request.data)
     # request.data is coming from frontend
    amount = request.data['amount']
    course_id = request.data['course_id']
    student_id =request.data['student_id']

    # setup razorpay client this is the client to whome user is paying money that's you
    client =  razorpay.Client(auth=(settings.PUBLIC_KEY , settings.SECRET_KEY ))
    print('****')

    # create razorpay order
    # the amount will come in 'paise' that means if we pass 50 amount will become
    # 0.5 rupees that means 50 paise so we have to convert it in rupees. So, we will 
    # mumtiply it by 100 so it will be 50 rupees.
    payment = client.order.create({"amount": int(amount) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})
    print(payment)
    # we are saving an order with isPaid=False because we've just initialized the order
    # we haven't received the money we will handle the payment succes in next 
    # function
   
    course =Course.objects.get(pk=course_id)
    student =Student.objects.get(pk=student_id)
    order = StudentCourseEntrollment.objects.create(course=course, 
                                 order_amount=amount, 
                                 student=student,
                                 order_payment_id=payment['id'])

    serializer = OrderSerializer(order)

    """order response will be 
    {'id': 17, 
    'order_date': '23 January 2021 03:28 PM', 
    'order_product': '**product name from frontend**', 
    'order_amount': '**product amount from frontend**', 
    'order_payment_id': 'order_G3NhfSWWh5UfjQ', # it will be unique everytime
    'isPaid': False}"""

    data = {
        "payment": payment,
        "order": serializer.data
    }
    return Response(data)





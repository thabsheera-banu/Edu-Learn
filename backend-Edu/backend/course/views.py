
from django.shortcuts import render
from  rest_framework import generics,status
from . models import CourseCategory,Course,Chapter ,StudentCourseEntrollment
from users.models import Teacher ,Student
from . serializer import CategorySerializers,CourseSerializers,ChapterSerializer ,StudentCourseEntrollSerializers ,OrderSerializer ,FreeOrderSerialzer
from rest_framework.response import Response
from django.http import JsonResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.conf  import settings
import razorpay
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination




# Create your views here.
def index(request):
    pass

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 4

class CategoryList(generics.ListCreateAPIView):
    queryset=CourseCategory.objects.all()
    serializer_class=CategorySerializers

class CategoryUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset=CourseCategory.objects.all()
    serializer_class=CategorySerializers

class  CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializers
    pagination_class = StandardResultsSetPagination
    def perform_create(self, serializer):
        category_id = self.request.data.get('category')
        category = CourseCategory.objects.get(id=category_id)
        teacher_id = self.request.data.get('teacher')

        serializer.save(category=category,teacher_id=teacher_id)   
    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit =int(self.request.GET['result'])
            qs = Course.objects.all().order_by('-id')[:limit]

        if 'category' in self.request.GET:
            category = self.request.GET['category']
            category = CourseCategory.objects.filter(id=category).first()
            qs = Course.objects.filter(category=category)

        if 'searchstring' in self.kwargs:
            search = self.kwargs['searchstring']
            if search:
             qs = Course.objects.filter(Q(title__icontains = search))

        return qs
    
        






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
    
class EntrolledStudentList(generics.ListAPIView):
    queryset = StudentCourseEntrollment.objects.all()
    serializer_class = StudentCourseEntrollSerializers
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = Course.objects.get(pk=course_id)
            return StudentCourseEntrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id =self.kwargs['teacher_id']
            teacher = Teacher.objects.get(pk=teacher_id)
            return StudentCourseEntrollment.objects.filter(course__teacher=teacher).distinct()
        elif 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = Student.objects.get(pk = student_id)
            return StudentCourseEntrollment.objects.filter(student=student).distinct()
        

        
    



class MyTeacherList(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializers
    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            sql = f"SELECT * FROM course_course as c,course_studentCourseEntrollment as e,teacher as t WHERE c.teacher_id=t.id AND e.course_id=c.id AND e.student_id={student_id}  GROUP BY c.teacher_id"
            qs = Course.objects.raw(sql)
            print(qs)
            return qs
        

#payment

@api_view(['POST'])
def start_payment(request):
    
    print(request.data)
    amount = request.data['amount']
    course_id = request.data['course_id']
    student_id =request.data['student_id']

    client =  razorpay.Client(auth=(settings.PUBLIC_KEY , settings.SECRET_KEY ))
    print('****')

    
    payment = client.order.create({"amount": int(amount) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})
    print(payment)
    
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


import json
@api_view(['POST'])

def handle_payment_success(request):
    # request.data is coming from frontend
    print('kkk')
    # print(request.data)
    # res = (request.data)
    print("dsfa")
    # print(res)
    res = json.loads(request.data["response"])
    print(res)
    """res will be:
    {'razorpay_payment_id': 'pay_G3NivgSZLx7I9e', 
    'razorpay_order_id': 'order_G3NhfSWWh5UfjQ', 
    'razorpay_signature': '76b2accbefde6cd2392b5fbf098ebcbd4cb4ef8b78d62aa5cce553b2014993c0'}
    this will come from frontend which we will use to validate and confirm the payment
    """

    ord_id = ""
    raz_pay_id = "" 
    raz_signature = ""

    # res.keys() will give us list of keys in res
    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]
    print(ord_id,"loooooo")
    order = StudentCourseEntrollment.objects.get(order_payment_id=ord_id)

    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }

    client = razorpay.Client(auth=(settings.PUBLIC_KEY , settings.SECRET_KEY ))

    
    check = client.utility.verify_payment_signature(data)
    print(check)
    print(order,'ordo')
    if check is None:
        print("Redirect to error url or error page")
        return Response({'error': 'Something went wrong'})
    

    order = StudentCourseEntrollment.objects.get(order_payment_id=ord_id)
    order.isPaid = True
    
    order.save()
    print('user is',request.user)
    
    
    res_data = {
        'message': 'payment successfully received!'
    }

    return Response(res_data)

@api_view(['GET'])
def fetch_entroll_status(request,student_id,course_id):
    student =Student.objects.filter(id=student_id).first()
    course =Course.objects.filter(id=course_id).first()
    entrol_count=StudentCourseEntrollment.objects.filter(course=course).count()
    entrollStatus=StudentCourseEntrollment.objects.filter(course=course,student=student,isPaid=True).count()
    print(entrol_count)
    if entrollStatus:
        return Response({'bool':True,'count':entrol_count})
    else:
        return Response({'bool':False})
    

from rest_framework.permissions import AllowAny,IsAdminUser,IsAuthenticated
from rest_framework.views import APIView


class FreeEntroll(APIView):

    # permission_classes=[IsAuthenticated]

    def post(self, request, format=None):
        print(request.data)
        serializer = FreeOrderSerialzer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    





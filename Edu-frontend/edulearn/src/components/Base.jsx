import { Route, Routes } from "react-router";
import Home from "./Home";
import Navbar from "./Navbar";
import TeacherRegister from "../Teacher/TeacherRegister";
import TeacherLogin from "../Teacher/TeacherLogin";
import Footer from "./Footer";
import CourceDetail from "../Pages/CourceDetail";
import AllCourses from "./AllCourses";
import AdminLogin from "../Admin/AdminLogin";
import AdminPage from "../Admin/AdminPage";
import StudentRegister from "../Student/StudentRegister";
import StudentLogin from "../Student/StudentLogin";
import TutorSidebar from "../Tutor/TutorSidebar";
import TutorDashboard from "../Tutor/TutorDashboard";
import AddCource from "../Tutor/AddCource";
import AdminDashboard from "../Admin/AdminDashboard";
import AddUsers from "../Admin/AddUsers";
import TutorCourses from "../Tutor/TutorCourses";
import AddChapter from "../Tutor/AddChapter";
import AllChapters from "../Tutor/CourseChapters";
import EditChapter from "../Tutor/EditChapter";
import EditCource from "../Tutor/EditCourse";
import TeacherProfile from "../Tutor/TeacherProfile";
import StudentSidebar from "../Student/StudentSidebar";
import StudentDashboard from "../Student/StudentDashboard";

import AddTutors from "../Admin/AddTutors";
import TutorChat from "../Tutor/TutorChat";
import TutorMyStudent from '../Tutor/TutorMyStudent'
import StudentCourses from "../Student/StudentCourses";
import StudentTeachers from "../Student/StudentTeachers";
import StudentLogout from "../Student/StudentLogout";
import Payment from "../payment/Payment";
import PaymentSuccess from "../payment/PaymentSuccess";
import Test from "../Pages/Test";
import StudentProfile from "../Student/StudentProfile";
import StudentCourceList from "../Student/StudentCourceList";
import Search from "../Pages/Search";
import Category from "../Pages/Category";
import CourseByCategory from "../Pages/CourseByCategory";
import AddCategory from "../Admin/AddCategory";
import CategoryList from "../Admin/CategoryList";



function Base() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/detail/:cource_id" element={<CourceDetail />} />
        <Route path="/search/:searchstring" element={<Search />} />

        <Route path="/all-cources" element={<AllCourses />} />
        <Route path="/category" element={<Category />} />
        <Route path="/course/:category_id" element={<CourseByCategory />} />



        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-page" element={<AdminPage />} />

        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/tutor/sidebar" element={<TutorSidebar />} />
        <Route path="/tutor/dashboard" element={<TutorDashboard />} />
        <Route path="/tutor/addcourse" element={<AddCource />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users/" element={<AddUsers />} />
        <Route path="/admin/tutors/" element={<AddTutors />} />
        <Route path="/admin/addCategory/" element={<AddCategory />} />
        <Route path="/admin/addCategory/:categoryId" element={<AddCategory />} />
        <Route path="/admin/Categorylist/" element={<CategoryList />} />


        <Route path="/tutor/course" element={<TutorCourses />} />
        <Route path="/add-chapter/:course_id" element={<AddChapter />} />
        <Route path="/tutor/all-chapters/:course_id" element={<AllChapters />} />
        <Route path="/tutor/edit-chapter/:chapter_id" element={<EditChapter />} />
        <Route path="/tutor/edit-course/:course_id" element={<EditCource />} />
        <Route path="/tutor/profile" element={<TeacherProfile />} />
        <Route path="/student" element={<StudentSidebar />} />
        <Route path="/student-dsb" element={<StudentDashboard />} />
        <Route path="tutor/chat" element={<TutorChat />} />
        <Route path="tutor/studentlist" element={<TutorMyStudent />} />
        <Route path="/student-courselist" element={<StudentCourses />} />
        <Route path="/student-teacherlist" element={<StudentTeachers />} />
        <Route path="/student-logout" element={<StudentLogout />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/student-myCource" element={<StudentCourceList />} />



         {/* payment */}
        <Route path="/payment" element={<Payment/>} />
        <Route path="/payment/success" element={<PaymentSuccess/>} />
        <Route path="/test" element={<Test/>} />











































      </Routes>
      <Footer />

    </div>
  );
}

export default Base;

import { Route, Routes } from "react-router";
import Home from "./Home";
import Navbar from "./Navbar";
import TeacherRegister from "../Teacher/TeacherRegister";
import TeacherLogin from "../Teacher/TeacherLogin";
import Footer from "./Footer";
import CourceDetail from "../Pages/CourceDetail";
import AllCourses from "./AllCourses";
import CourseCategory from "./CourseCategory";
import AdminLogin from "../Admin/AdminLogin";
import AdminPage from "../Admin/AdminPage";
import StudentRegister from "../Student/StudentRegister";
import StudentLogin from "../Student/StudentLogin";
import CategoryCource from "../Cource/CategoryCource";
import Sidebar from "../Teacher/Sidebar";
// import AddCource from "../Teacher/AddCource";
import Dashboard from "../Teacher/Dashboard/Dashboard";
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



function Base() {
    return (
      <div className="App">

        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/teacher-register"  element={<TeacherRegister/>} />
          <Route path="/teacher-login"  element={<TeacherLogin/>} />
          <Route path="/detail/:cource_id" element={<CourceDetail/>}/>
          <Route path="/all-cources" element={<AllCourses/>}/>
          <Route path="/categor" element={<CourseCategory/>}/>

          <Route path="/admin-login" element={<AdminLogin/>}/>
          <Route path="/admin-page" element={<AdminPage/>}/>

          <Route path="/student-register" element={<StudentRegister/>}/>
          <Route path="/student-login" element={<StudentLogin/>}/>
          <Route path="/category/:category_slug" element={<CategoryCource/>}/>
          <Route path="/sidebar" element={<Sidebar/>}/>
          {/* <Route path="/add-cource" element={<AddCource/>}/> */}
          <Route path="/dashboard" element={<Dashboard/>}/>
          {/* <Route path="/addCouse" element={<AddCource/>}/> */}
          <Route path="/tutor/sidebar" element={<TutorSidebar/>}/>
          <Route path="/tutor/dashboard" element={<TutorDashboard/>}/>
          <Route path="/tutor/addcourse" element={<AddCource />}/>
          <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
          <Route path="/admin/users/" element={<AddUsers/>}/>
          <Route path="/tutor/course" element={<TutorCourses/>}/>
          <Route path="/add-chapter/:course_id" element={<AddChapter/>}/>
          <Route path="/tutor/all-chapters/:course_id" element={<AllChapters/>}/>
          <Route path="/tutor/edit-chapter/:chapter_id" element={<EditChapter/>}/>
          <Route path="/tutor/edit-course/:course_id" element={<EditCource/>}/>
          <Route path="/tutor/profile" element={<TeacherProfile/>}/>
          <Route path="/student" element={<StudentSidebar/>}/>
          <Route path="/student-dsb" element={<StudentDashboard/>}/>


















          














        </Routes>
        <Footer/>

      </div>
    );
  }
  
  export default Base;
  
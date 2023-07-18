import React, { createContext, useEffect, useState  } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import BaseUrl from '../BaseUrl';
import { useNavigate  } from 'react-router';

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [teacherId, setTeacherId] = useState('');
  const [student,setStudent] = useState(null);
  const [studentId, setstudentId] = useState('');



  useEffect(() => {
    // Check if the user object exists in cookies
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/user/teacherlogin',
        { email, password }
      );

      const { data } = response;

      const { access_token, refresh_token, teacher_id  } = data;
      Cookies.set('access-token', access_token);
      Cookies.set('refresh-token', refresh_token);
      Cookies.set('teacher_id', teacher_id);
      localStorage.setItem('teacherId',teacherId)
      localStorage.setItem('teacherloginStatus',data.teacherloginStatus)

      setTeacherId(teacher_id);
      const userData = { teacherId: teacher_id, access_token, refresh_token };
      setUser(userData);
      setIsAuthenticated(true);

      // Store the user object in cookies
      Cookies.set('user', JSON.stringify(userData));

      return { teacherId: teacher_id };
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  const logout = () => {
    Cookies.remove('access-token');
    Cookies.remove('refresh-token');
    Cookies.remove('teacher_id');
    localStorage.removeItem('teacherloginStatus')
    setUser(null)

    // Clear the user object from cookies
    Cookies.remove('user');

    // Set user and isAuthenticated states
    setUser(null);
    setIsAuthenticated(false);
    
  };

  const studentLogin = async(email,password) =>{
    try{
      const response = await axios.post(
        BaseUrl+'user/studentlogin',
        { email,password}
        );
        const { data } = response;
        const { access_token,refresh_token,student_id} = data;
        Cookies.set('access-token', access_token);
        Cookies.set('refresh-token', refresh_token);
        Cookies.set('student_id', student_id);
        localStorage.setItem('StudentId',studentId)

        setstudentId(student_id);
      const studentData = { studentId: student_id, access_token, refresh_token };
      setStudent(studentData);
      setIsAuthenticated(true);

      // Store the user object in cookies
      Cookies.set('student', JSON.stringify(studentData));

      return { studentId: student_id };
    }catch(error){
      console.log(error);
    }
  }

  const studentLogout = () => {
    Cookies.remove('access-token');
    Cookies.remove('refresh-token');
    Cookies.remove('student_id');
    localStorage.removeItem('StudentId')
    localStorage.removeItem('studentLoginstatus')
    setStudent(null)

    // Clear the user object from cookies
    Cookies.remove('student');

    // Set user and isAuthenticated states
    setStudent(null);
    setIsAuthenticated(false);
    navigate('/student-login')

  }

  

  const authContextValue = {
    isAuthenticated,
    user,
    teacherId,
    login,
    logout,
    studentLogin,
    studentLogout,
    student
    
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

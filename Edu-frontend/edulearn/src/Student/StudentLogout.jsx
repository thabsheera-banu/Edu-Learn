import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function StudentLogout() {
    const navigate = useNavigate()
    const logout = () => {
        // Clear local storage and cookies
        localStorage.removeItem('studentLoginstatus');
        localStorage.removeItem('StudentId');
        Cookies.remove('access-token');
        Cookies.remove('refresh-token');
        navigate('/student-login');
      };
  return (
    <div>
        <p onClick={logout}>logout</p>
      
    </div>
  )
}

export default StudentLogout

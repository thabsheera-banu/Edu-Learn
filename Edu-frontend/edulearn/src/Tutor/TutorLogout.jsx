import React from 'react'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'

function TutorLogout() {
    const navigate = useNavigate()
    const handleLogout = () =>{
        Cookies.remove('access-token')
        Cookies.remove('refresh-token')
        localStorage.removeItem('teacherId')
        navigate('/teacher-login')
    }

    
  return (
    <p
    
    onClick={handleLogout}
  >
    Logout
  </p>
  )
}

export default TutorLogout

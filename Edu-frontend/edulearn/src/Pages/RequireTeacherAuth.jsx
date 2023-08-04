import {React } from 'react';
import { Navigate} from 'react-router-dom'


const RequireTeacherAuth = ({children,...rest})=>{
    const teacherLoginstatus = localStorage.getItem('teacherloginStatus')
    // const {isAuthenticated} = useContext(AuthContext)
    console.log("requireauth works teacherLoginstatus ", teacherLoginstatus);
    return(
        <>{teacherLoginstatus ? children:
        <Navigate to='/teacher-login'/>}</>
    )
}

export default RequireTeacherAuth;
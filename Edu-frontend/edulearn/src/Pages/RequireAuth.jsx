import {React,useContext} from 'react';
import { Navigate} from 'react-router-dom'


const RequireAuth = ({children,...rest})=>{
    const studentLoginstatus = localStorage.getItem('studentLoginstatus')
    // const {isAuthenticated} = useContext(AuthContext)
    console.log("requireauth works", studentLoginstatus);
    return(
        <>{studentLoginstatus ? children:
        <Navigate to='/student-login'/>}</>
    )
}

export default RequireAuth;
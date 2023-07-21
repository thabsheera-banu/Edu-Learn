import {React,useContext} from 'react';
import { Navigate} from 'react-router-dom'
import AuthContext from '../Context/AuthContext';


const RequireAuth = ({children,...rest})=>{
    let {isAuthenticated} = useContext(AuthContext)
    console.log("requireauth works");
    return(
        <>{isAuthenticated ? children:
        <Navigate to='/student-login'/>}</>
    )
}

export default RequireAuth;
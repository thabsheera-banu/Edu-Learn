import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useTransition } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import AuthContext from '../Context/AuthContext';



function TeacherLogin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');

  const validateForm = () => { 
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }
    
    return true;
  };

  const submitForm = async (e) => {
     e.preventDefault();
     if (!validateForm()) {
      return;
    }

     const user = {
      email : email,
      password : password
     };
     console.log(user, "user input data")
     try{
      const { teacherId } = await login(email, password);
      localStorage.setItem('teacherId', teacherId);
      navigate('/tutor/dashboard');

      // const {data} = await axios.post("http://127.0.0.1:8000/user/teacherlogin", user);
      // console.log(data)
      // Cookies.set("access-token", data.access_token)
      // Cookies.set("refresh-token", data.refresh_token)
      // localStorage.setItem('teacherId',data.teacher_id)
      // navigate("/tutor/dashboard")
     }
     catch(error){
      console.error("Error",error)
      setError('username or password is incorrect')
     }

  }

  return (
    <section className="vh-100 " style={{ backgroundImage: "url('')", backgroundSize: 'cover' ,  backdropFilter: 'blur(5px)' ,backgroundColor:'#9370DB'  }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
            <div className="card shadow-2-strong  " style={{backgroundImage: "url('')" ,backgroundSize: 'cover'  ,borderWidth: '2px', borderColor: 'white', borderRadius: '10px'}}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5"> Teacher Sign in</h3>
                <div>
                {error && <p className="text-danger">{error}</p>}
                </div>
                <div>
                  <div className="form-outline mb-4">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      id="typeEmailX-2"
                      name="email"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      id="typePasswordX-2"
                      name="password"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                  </div>

                  <div className="form-check d-flex justify-content-start mb-4">
                    <label className="form-check-label" htmlFor="form1Example3">Dont have an Account pls ...<Link to="/teacher-register">Register</Link></label>
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="button"
                    onClick={submitForm}
                  >
                    Login
                  </button>

                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeacherLogin;






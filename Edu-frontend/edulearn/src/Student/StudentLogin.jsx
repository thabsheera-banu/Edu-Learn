import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import BaseUrl from '../BaseUrl'


function StudentLogin() {
  const navigate=useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [status,setStatus] = useState('')
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
     password : password,
     status : status
    };
    console.log(user, "user input data")
    try{
      const {data} = await axios.post(BaseUrl+"user/studentlogin", user);
      console.log(data)
      setStatus(data)
      localStorage.setItem('studentLoginstatus',data.studentLoginstatus)
      localStorage.setItem('StudentId',data.student_id)
      localStorage.setItem('access_token',data.access_token)
      Cookies.set("access-token", data.access_token)
      Cookies.set("refresh-token", data.refresh_token)
      navigate("/student-dsb")
    }
    catch(error){
      setError("invalid password or username")
    }

 }

 

  
  return (
    <section className="vh-100"
    style={{
      backgroundImage: "url('c1.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong"
            style={{
              backgroundColor: 'transparent',
            }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5 text-white">Student Login</h3>
                <div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
              </div>
                <div>
                  <div className="form-outline mb-4">
                    <input onChange={(e) => setEmail(e.target.value)}
                    value={email}
                      
                      type="email"
                      id="typeEmailX-2"
                      name="email"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input onChange={ (e) => setPassword(e.target.value)}
                    value={password}
                      
                      type="password"
                      id="typePasswordX-2"
                      name="password"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                  </div>

                  <div className="form-check d-flex justify-content-start mb-4">
                    {/* <input className="form-check-input" type="checkbox" value="" id="form1Example3" /> */}

                    <label className="form-check-label" htmlFor="form1Example3">Dont have an Account pls Login here ....  <Link to="/student-register"> Register </Link></label>
                  </div>

                  <button onClick={submitForm}
                    className="btn btn-primary btn-lg btn-block"
                    type="button"
                    
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
  )
}

export default StudentLogin

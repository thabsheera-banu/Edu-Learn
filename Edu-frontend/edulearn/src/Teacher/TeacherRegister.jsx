import React, { useState } from 'react';

import './teacher.css'
import axios from 'axios';
import { useNavigate } from 'react-router';


function TeacherRegister() {
  const navigate=useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [full_name, setFull_name] = useState('')
  const [qualification, setQualification] = useState('')
  const [mobile_no, setMobile_no] = useState('')
  const [skills, setSkills] = useState('')
  const [error,setError] =useState('')

  const validateForm = () => {
    if (!email || !password || !full_name || !qualification || !mobile_no || !skills) {
      setError('Please fill in all fields');
      return false;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const validateEmail = (email) => {
    
    return true;
  };

  const submitForm = async(e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const user = {
      email: email,
      password :password,
      full_name : full_name,
      qualification : qualification,
      mobile_no : mobile_no,
      skills : skills
    }
    const {data} = await axios.post("http://127.0.0.1:8000/user/register", user)
    console.log( "axios return data" ,data);
    navigate('/teacher-login')
    
  }



  return (
    <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
      <div className="wrapper wrapper--w680">
        <div className="card card-4">


          <div className="card-body">
            <h2 className="title">Teacher Registration Form</h2>
            <div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
              </div>

            <form method="">
              <div className="row row-space">
                {/* {teacherData.status === 'success' && (
                  <p className="text-success">Thanks for registration</p>
                )} */}
                {/* {teacherData.status === 'error' && (
                  <p className="text-danger">Something went wrong</p>
                )} */}
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">Full name</label>
                    <input onChange={(e) => setFull_name(e.target.value)} value={full_name} className="input--style-4" type="text" name="full_name" />
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className="input--style-4" type="email" name="email" />
                  </div>
                </div>
              </div>


              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className="input--style-4" type="password" name="password" />
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">Qualification</label>
                    <input onChange={(e) => setQualification(e.target.value)} value={qualification} className="input--style-4" type="text" name="qualification" />
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">Mobile</label>
                    <input onChange={(e) => setMobile_no(e.target.value)} value={mobile_no} className="input--style-4" type="number" name="mobile_no" />
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    <label className="label">skills</label>
                    <input onChange={(e) => setSkills(e.target.value)} value={skills} className="input--style-4" type="text" name="skills" />
                  </div>
                </div>
              </div>

              <div className="p-t-15">
                <button onClick={submitForm} className="btn btn--radius-2 btn--blue" >Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherRegister;


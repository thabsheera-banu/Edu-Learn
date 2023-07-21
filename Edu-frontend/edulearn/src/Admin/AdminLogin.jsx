import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminLogin() {
  const navigate=useNavigate();
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError] = useState('')
  const submitForm = async (e) => {
    e.preventDefault();
    const user={
      email : email,
      password : password
    };
    try{
    const {data} = await axios.post("http://localhost:8000/user/admin-login", user);
    console.log(data);
    navigate("/admin/dashboard")
    }
    catch(error){
      setError(error.response.data.detail);
      // setError("You are not an admin")

    }
  }
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong">
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Admin Login</h3>
                <Link to='/'>
              <img src="logo.png" alt="Logo" style={{ marginBottom: '20px', maxWidth: '50px' }} />
              </Link>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div>
                  <div className="form-outline mb-4">
                    <input
                    onChange={(e)=>setEmail(e.target.value)}
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
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                    <label className="form-check-label" htmlFor="form1Example3">Remember password</label>
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
  )
}

export default AdminLogin

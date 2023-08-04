import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import {Link} from 'react-router-dom'
import BaseUrl from '../BaseUrl'

function StudentRegister() {
    const navigate=useNavigate()
    const [full_name,setfullname]=useState('')
    const [email,setemail]=useState('')
    const [qualification,setQualofication]=useState('')
    const [password,setPassword]=useState('')
    const [mobile_no, setMobile_no] = useState('')
    const [intrested_category, setintrested_category] = useState('')
    const [error,setError] =useState('')

  const validateForm = () => {
    if (!email || !password || !full_name || !qualification || !mobile_no || !intrested_category) {
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

  
    

    const submitForm = async(e) =>{
      e.preventDefault()
      if (!validateForm()) {
        return;
      }
  

      const user = {
        email: email,
        password :password,
        full_name : full_name,
        qualification : qualification,
        mobile_no : mobile_no,
        intrested_category : intrested_category
      }

      const {data} = await axios.post(BaseUrl + "user/student-register", user)
      console.log( "axios return data" ,data);
      navigate('/student-login')
      


    }

// console.log(username);
  return (
    // <section className="vh-100"
    // style={{
    //   // backgroundColor:'#7F7F7F',

    //   backgroundImage: "url('b8.jpg')",
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    // }}>
      
    //   <div className="container py-5 h-100">
    //     <div className="row d-flex justify-content-center align-items-center h-100">
    //       <div className="col-12 col-md-8 col-lg-6 col-xl-5">
    //         <div className="card shadow-2-strong">
    //           <div className="card-body p-5 text-center">
    //             <h3 className="mb-5">Student Register</h3>
    //             <div>
    //             {error && (
    //               <div className="alert alert-danger" role="alert">
    //                 {error}
    //               </div>
    //             )}
    //           </div>
    //             <div>
    //               <div className="form-outline mb-4">
    //                 <input onChange={(e) => setfullname(e.target.value)} 
    //                 value={full_name}
                      
    //                   type="text"
    //                   id="typeEmailX-2"
    //                   name="full_name"
    //                   className="form-control form-control-lg"
    //                 />
    //                 <label  className="form-label" htmlFor="typeEmailX-2">Username</label>
    //               </div>

    //               <div className="form-outline mb-4">
    //                 <input onChange={(e) => setemail(e.target.value)} 
    //                 value={email}
                      
    //                   type="email"
    //                   id="typePasswordX-2"
    //                   name="email"
    //                   className="form-control form-control-lg"
    //                 />
    //                 <label className="form-label" htmlFor="typePasswordX-2">Email</label>
    //               </div>
    //               <div className="form-outline mb-4">
    //                 <input onChange={(e) => setQualofication(e.target.value)}
    //                 value={qualification}
                      
    //                   type="text"
    //                   id="typePasswordX-2"
    //                   name="qualification"
    //                   className="form-control form-control-lg"
    //                 />
    //                 <label className="form-label" htmlFor="typePasswordX-2">Qualification</label>
    //               </div>

    //               <div className="form-outline mb-4">
    //                 <input onChange={(e) => setMobile_no(e.target.value)} 
    //                  value={mobile_no}
                      
    //                   type="number"
    //                   id="typePasswordX-2"
    //                   name="mobile_no"
    //                   className="form-control form-control-lg"
    //                 />
    //                 <label className="form-label" htmlFor="typePasswordX-2">Mobile</label>
    //               </div>
    //               <div className="form-outline mb-4">
    //                 <input onChange={(e) => setintrested_category(e.target.value)}
    //                 value={intrested_category}
                      
    //                   type="text"
    //                   id="typePasswordX-2"
    //                   name="intrested_category"
    //                   className="form-control form-control-lg"
    //                 />
    //                 <label className="form-label" htmlFor="typePasswordX-2">skills</label>
    //               </div>

    //               <div className="form-outline mb-4">
    //                 <input onChange={(e) => setPassword(e.target.value)}
    //                 value={password}
                      
    //                   type="password"
    //                   id="typePasswordX-2"
    //                   name="password"
    //                   className="form-control form-control-lg"
    //                 />
    //                 <label className="form-label" htmlFor="typePasswordX-2">password</label>
    //               </div>



    //               <div className="form-check d-flex justify-content-start mb-4">
    //                 <label className="form-check-label" htmlFor="form1Example3">Already Login :<Link to="/student-login">Login</Link></label>
    //               </div>

    //               <button onClick={submitForm}
    //                 className="btn btn-primary btn-lg btn-block"
    //                 type="button"
                    
    //               >
    //                 Register
    //               </button>

    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <div className="page-wrapper  p-t-130 p-b-100 font-poppins "
    style={{
      // backgroundColor:'#7F7F7F',
      backgroundImage: "url('b11.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="wrapper wrapper--w680 ">
        <div className="card card-4 ">


          <div className="card-body">
            <h2 className="title">Student Registration Form</h2>
            <div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
              </div>

            <form method="">
              <div className="row row-space">
               
                <div className="col-2">
                  <div className="input-group">
                    {/* <label className="label">Full name</label> */}
                    <input onChange={(e) => setfullname(e.target.value)} value={full_name} className="input--style-4" type="text" name="full_name" placeholder='FullName' />
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    {/* <label className="label">Email</label> */}
                    <input onChange={(e) => setemail(e.target.value)} value={email} className="input--style-4" type="email" name="email" placeholder='Email' />
                  </div>
                </div>
              </div>


              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    {/* <label className="label">Password</label> */}
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className="input--style-4" type="password" name="password" placeholder='password' />
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    {/* <label className="label">Qualification</label> */}
                    <input onChange={(e) => setQualofication(e.target.value)} value={qualification} className="input--style-4" type="text" name="qualification" placeholder='Qualification' />
                  </div>
                </div>
              </div>
              <div className="row row-space">
                <div className="col-2">
                  <div className="input-group">
                    {/* <label className="label">Mobile</label> */}
                    <input onChange={(e) => setMobile_no(e.target.value)} value={mobile_no} className="input--style-4" type="number" name="mobile_no" placeholder='Mobile' />
                  </div>
                </div>
                <div className="col-2">
                  <div className="input-group">
                    {/* <label className="label">skills</label> */}
                    <input onChange={(e) => setintrested_category(e.target.value)} value={intrested_category} className="input--style-4" type="text" name="intrested_category" placeholder='skills' />
                  </div>
                </div>
              </div>

              <div className="p-t-15">
                <button onClick={submitForm} className="btn btn--radius-2 btn--blue" >Register</button>
              </div>
              <div className='mt-3'>
              <label className="form-check-label" htmlFor="form1Example3">Already Login ...<Link to="/student-login">Login</Link></label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentRegister

import React, { useState ,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Theader from './Theader';
import TutorSidebar from './TutorSidebar';
import axios from 'axios';
import { useNavigate } from 'react-router';
import BaseUrl from '../BaseUrl';
import Swal from 'sweetalert2';

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    
  } from 'mdb-react-ui-kit';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

function TeacherProfile() {
    const Navigate = useNavigate()
    const [errors,setErrors] = useState('')
    const [teacherData,setteacherData] = useState({
        'full_name' :'',
        'email' : '',
        'qualification' :'',
        'mobile_no' : '',
        'skills' :'',
        'status' : '',
        'prev_img':'',
        'p_img' : '',
    })
    const teacherId = localStorage.getItem('teacherId');
    useEffect(() => {
        

        // fetch current cource data
        try{
            axios.get(BaseUrl + "teacher/teacher-detail/" + teacherId)
            .then((res) =>{
                setteacherData({
                    full_name : res.data.full_name,
                    email :res.data.email,
                    qualification : res.data.qualification,
                    mobile_no : res.data.mobile_no,
                    profile_img : res.data.profile_img,
                    p_img : '',
                    skills : res.data.skills,


                })

            })

        }catch(error){
            console.log(error);
        }
        // End


    },[])

    const validateForm = () => {
      const errors = {};
  
      if (!teacherData.full_name) {
        errors.full_name = 'Name is required';
      }
  
      
  
      if (!teacherData.qualification) {
        errors.qualification = 'Qualification is required';
      }
  
      // if (!teacherData.mobile_no) {
      //   errors.mobile_no = 'Mobile number is required';
      // } else if (!isValidMobileNumber(teacherData.mobile_no)) {
      //   errors.mobile_no = 'Invalid mobile number format';
      // }
  
      if (!teacherData.skills) {
        errors.skills = 'Skills are required';
      }
  
      setErrors(errors);
  
      return Object.keys(errors).length === 0;
    };
  
    const isValidEmail = (email) => {
      // Email validation logic here
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
  
    const isValidMobileNumber = (mobileNo) => {
      // Mobile number validation logic here
      return /^[0-9]{10}$/.test(mobileNo);
    };
    

    const handleChange =(event)=>{
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
      }

      const handleFileChange =(event) => {
        setteacherData({
            ...teacherData,
            p_img: event.target.files[0]
        });
    }
    const handleSubmit = ((event)=>{
      event.preventDefault();

    if (!validateForm()) {
      return;
    }
      const teacherFormData = new FormData();
      teacherFormData.append("full_name", teacherData.full_name)
      teacherFormData.append("email", teacherData.email)
      teacherFormData.append("qualification", teacherData.qualification)
      teacherFormData.append("mobile_no", teacherData.mobile_no)
      teacherFormData.append("skills", teacherData.skills)
      if(teacherData.p_img !== ''){
        teacherFormData.append('profile_img',teacherData.p_img,teacherData.p_img.name);
      } 
  
  
      try{
        axios.put(BaseUrl+'teacher/teacher-detail/'+teacherId,teacherFormData,{
          headers : {
            'Content-Type' : 'multipart/form-data'
        }
        }).then((response)=>{
          if(response.status === 200){
            setteacherData(prevData => ({
              ...prevData,
              full_name: teacherData.full_name,
              email: teacherData.email,
              qualification: teacherData.qualification,
              mobile_no: teacherData.mobile_no,
              profile_img: response.data.profile_img,
              skills: teacherData.skills,
            }));
            Swal.fire({
                title : 'data has been updated',
                icon  : 'success' ,
                toast :true,
                timer :3000 ,
                position : 'top-right' ,
                timerProgressBar : true ,
                showConfirmButton :false
                
    
            })
    
    }

          
  
        })
      }catch(error){
        console.log(error);
        setteacherData({
          'status':'error'
        })
      }
    
    })

      
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Theader /> */}
      <div className='container mt-4'>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Paper className={classes.paper}>
              <TutorSidebar />
            </Paper>
          </Grid>
          <Grid item md={9}>
            <Paper className={classes.paper}>
              {/* Content for the main profile section */}
              <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={teacherData.profile_img}
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '150px' }}
                    />

                <p className="text-muted mb-1">{teacherData.full_name}</p>
                <p className="text-muted mb-4">{teacherData.qualification}, {teacherData.mobile_no}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                <div className="mb-3">
                        <label for='title' className="form-labe">Name</label>
                        <input value={teacherData.full_name} onChange={handleChange} type="text" id='title' name='full_name' className="form-control" />
                </div>
                  
                 
                </MDBRow>
                <MDBRow>
                <div className="mb-3">
                        <label for='title' className="form-labe">Email</label>
                        <input value={teacherData.email} onChange={handleChange} type="email" id='title' name='email' className="form-control" disabled/>
                </div>
                </MDBRow>
                <MDBRow>
                <div className="mb-3">
                        <label for='title' className="form-labe">Qualification</label>
                        <input value={teacherData.qualification} onChange={handleChange} type="text" id='title' name='qualification' className="form-control" />
                </div>
                </MDBRow>
                <MDBRow>
                <div className="mb-3">
                    <label for='video' className="form-label">profile  image</label>
                    <input type="file" id='video' onChange={handleFileChange} name="profile_img" className="form-control" />
                    {/* {teacherData.p_img &&(
                        <img src={teacherData.p_img} width="300"/>
                    )} */}
                </div>
                </MDBRow>
                <MDBRow>
                <div className="mb-3">
                        <label for='title' className="form-labe">Mobile</label>
                        <input value={teacherData.mobile_no} onChange={handleChange} type="number" id='title' name='mobile_no' className="form-control" disabled />
                </div>
                </MDBRow>
                <MDBRow>
                <div className="mb-3">
                        <label for='title' className="form-labe">skills</label>
                        <input value={teacherData.skills} onChange={handleChange} type="text" id='title' name='skills' className="form-control" />
                </div>
                </MDBRow>
                <MDBRow>
                   <MDBBtn  onClick={handleSubmit}>Update</MDBBtn>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TeacherProfile;

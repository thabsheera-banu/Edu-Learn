import React, { useState ,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import StudentSidebar from './StudentSidebar'
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

function StudentProfile() {
    const Navigate = useNavigate()
    const [studentData,setstudentData] = useState({
        'full_name' :'',
        'email' : '',
        'qualification' :'',
        'mobile_no' : '',
        'intrested_category' :'',
        'status' : '',
        'prev_img':'',
        'p_img' : '',
    })
    const StudentId = localStorage.getItem('StudentId');
    useEffect(() => {
        

        // fetch current cource data
        try{
            axios.get(BaseUrl + "teacher/student-detail/" + StudentId)
            .then((res) =>{
                setstudentData({
                    full_name : res.data.full_name,
                    email :res.data.email,
                    qualification : res.data.qualification,
                    mobile_no : res.data.mobile_no,
                    profile_img : res.data.profile_img,
                    p_img : '',
                    intrested_category : res.data.intrested_category,


                })

            })

        }catch(error){
            console.log(error);
        }
        // End


    },[])
    

    const handleChange =(event)=>{
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
      }

      const handleFileChange =(event) => {
        setstudentData({
            ...studentData,
            p_img: event.target.files[0]
        });
    }
    const handleSubmit = ((event)=>{
      const studentFormData = new FormData();
      studentFormData.append("full_name", studentData.full_name)
      studentFormData.append("email",studentData.email)
      studentFormData.append("qualification", studentData.qualification)
      studentFormData.append("mobile_no", studentData.mobile_no)
      studentFormData.append("intrested_category",studentData.intrested_category)
      if(studentData.p_img !== ''){
        studentFormData.append('profile_img',studentData.p_img,studentData.p_img.name);
      } 
  
  
      try{
        axios.put(BaseUrl+'teacher/student-detail/'+StudentId,studentFormData,{
          headers : {
            'Content-Type' : 'multipart/form-data'
        }
        }).then((response)=>{
          if(response.status === 200){
            setstudentData(prevData => ({
              ...prevData,
              full_name: studentData.full_name,
              email: studentData.email,
              qualification: studentData.qualification,
              mobile_no: studentData.mobile_no,
              profile_img: response.data.profile_img,
              intrested_category: studentData.intrested_category,
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
        setstudentData({
          'status':'error'
        })
      }
    
    })

      
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <div className='container mt-4'>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Paper className={classes.paper}>
            <StudentSidebar />
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
                      src={studentData.profile_img}
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '150px' }}
                    />

                <p className="text-muted mb-1">{studentData.full_name}</p>
                <p className="text-muted mb-4">{studentData.qualification}, {studentData.mobile_no}</p>
                <div className="d-flex justify-content-center mb-2">
                  {/* <MDBBtn>Message</MDBBtn> */}
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
                        <input value={studentData.full_name} onChange={handleChange} type="text" id='title' name='full_name' className="form-control" />
                </div>
                  
                 
                </MDBRow>
                <MDBRow>
                <div className="mb-3">
                        <label for='title' className="form-labe">Email</label>
                        <input value={studentData.email} onChange={handleChange} type="email" id='title' name='email' className="form-control" disabled/>
                </div>
                </MDBRow>
                <MDBRow>
                <div className="mb-3">
                        <label for='title' className="form-labe">Qualification</label>
                        <input value={studentData.qualification} onChange={handleChange} type="text" id='title' name='qualification' className="form-control" />
                </div>
                </MDBRow>
                <MDBRow>
                <div className="mb-3">
                    <label for='video' className="form-label">profile  image</label>
                    <input type="file" id='video' onChange={handleFileChange} name="profile_img" className="form-control" />
                    {/* {studentData.p_img &&(
                        <img src={studentData.p_img} width="300"/>
                    )} */}
                </div>
                </MDBRow>
                <MDBRow>
                <div className="mb-3">
                        <label for='title' className="form-labe">Mobile</label>
                        <input value={studentData.mobile_no} onChange={handleChange} type="number" id='title' name='mobile_no' className="form-control" disabled/>
                </div>
                </MDBRow>
                <MDBRow>
                <div className="mb-3">
                        <label for='title' className="form-labe">intrested_category</label>
                        <input value={studentData.intrested_category} onChange={handleChange} type="text" id='title' name='skills' className="form-control" />
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

export default StudentProfile;

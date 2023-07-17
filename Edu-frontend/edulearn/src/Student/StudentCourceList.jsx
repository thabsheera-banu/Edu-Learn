import React, { useEffect, useState } from 'react'
import StudentSidebar from './StudentSidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
   
  } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import BaseUrl from '../BaseUrl';


function StudentCourceList() {
    const [courseData,setCourseData] = useState([])
    const StudentId = localStorage.getItem('StudentId')
    useEffect(() =>{
      try{
        axios.get(BaseUrl+"course/fetch-entrolled-course/"+StudentId)
        .then((res)=>{
          setCourseData(res.data)

        },[])

      }catch(error){
        console.log(error);
      }
    },[])
  return (
    <div style={{ minHeight: '100vh' }}>

      <div className='container mt-4'>
        <div className='row'>
          <aside className='col-md-3'>
            <StudentSidebar />
          </aside>

          <div className='col-md-9'>
            <TableContainer component={Paper}>
              
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'lightblue' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Cource</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Created by</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}></TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                {courseData.map((row,index)=>(
                    <TableRow  key={index} >
                      <TableCell ><Link to={"/detail/"+row.course.id}>{row.course.title}</Link></TableCell>
                      <TableCell >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={row.course.teacher.profile_img} alt="Teacher Image" width="50" className="rounded" style={{ marginRight: '10px' }} />
                            <span>{row.course.teacher.full_name}</span>
                        </div>
                      </TableCell>


                      {/* <TableCell>
                        <IconButton color='primary' >
                          <CommentIcon />
                        </IconButton>
                      </TableCell> */}
                    </TableRow>
                    )

                )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
 

      
    </div>
  );
}

  
export default StudentCourceList

import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper ,Button} from '@mui/material';
import axios from 'axios';
import BaseUrl from '../BaseUrl';

function AddTutors() {
  const [student,setStudent] = useState([])

  //to get the all user list

  const fetchUser = () =>{
    axios.get(BaseUrl + 'teacher/teacher-list').then((res)=>{
      setStudent(res.data)
      console.log(res.data)

    })
  }
  useEffect(() =>{
    fetchUser()

  },[]) 


  // Block a student
  const blockTeacher = (teacherId) => {
    axios.post(BaseUrl + 'admin-api/block-teacher/'+ teacherId).then(() => {
      // Refresh the teacher list
      fetchUser()
    });
  };

  // Unblock a student
  const unblockteacher = (teacherId) => {
    axios.post(BaseUrl + 'admin-api/unblock-teacher/'+teacherId) .then(() => {
      // Refresh the teacher list
      fetchUser()
    });
  };
  
  return (
    <div style={{ minHeight: '100vh' }}>
      <AdminHeader />

      <div className='container mt-4'>
        <div className='row'>
          <aside className='col-md-3'>
            <AdminSidebar />
          </aside>

          <div className='col-md-9'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'lightblue' }}>
                    {/* <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell> */}
                    <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Mobile</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {student.map((tech,index) =>
                  <TableRow key={index} sx={{ backgroundColor: '' }}>
                    {/* <TableCell>{index+1}</TableCell> */}
                    <TableCell>{tech.id}</TableCell>
                    <TableCell>{tech.full_name}</TableCell>
                    <TableCell>{tech.email}</TableCell>
                    <TableCell>{tech.mobile_no}</TableCell>
                    <TableCell>
                    {tech.blocked ? (
                        <Button variant="contained" color="secondary" onClick={() => unblockteacher(tech.id)}>
                          Unblock
                        </Button>
                      ) : (
                        <Button variant="contained" color="success" onClick={() => blockTeacher(tech.id)}>
                          Block
                        </Button>
                      )}
                      </TableCell>

                  </TableRow>
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

export default AddTutors;

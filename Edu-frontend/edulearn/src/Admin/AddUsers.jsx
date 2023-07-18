import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper ,Button} from '@mui/material';
import axios from 'axios';
import BaseUrl from '../BaseUrl';

function AddUser() {
  const [student,setStudent] = useState([])

  //to get the all user list

  const fetchUser = () =>{
    axios.get(BaseUrl + 'admin-api/student-list').then((res)=>{
      setStudent(res.data)
      console.log(res.data)

    })
  }
  useEffect(() =>{
    fetchUser()

  },[]) 


  // Block a student
  const blockStudent = (studentId) => {
    axios.post(BaseUrl + 'admin-api/block-student/'+ studentId).then(() => {
      // Refresh the student list
      fetchUser()
    });
  };

  // Unblock a student
  const unblockStudent = (studentId) => {
    axios.post(BaseUrl + 'admin-api/unblock-student/'+studentId) .then(() => {
      // Refresh the student list
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
                  <TableRow sx={{ backgroundColor: 'lightgreen' }}>
                    {/* <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell> */}
                    <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Mobile</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Entrolled Course</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {student.map((stu,index) =>
                  <TableRow key={index} sx={{ backgroundColor: '' }}>
                    {/* <TableCell>{index+1}</TableCell> */}
                    <TableCell>{stu.id}</TableCell>
                    <TableCell>{stu.full_name}</TableCell>
                    <TableCell>{stu.email}</TableCell>
                    <TableCell>{stu.mobile_no}</TableCell>
                    <TableCell>{stu.entrolled_courses}</TableCell>
                    <TableCell>
                    {stu.blocked ? (
                        <Button variant="contained" color="secondary" onClick={() => unblockStudent(stu.id)}>
                          Unblock
                        </Button>
                      ) : (
                        <Button variant="contained" color="primary" onClick={() => blockStudent(stu.id)}>
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

export default AddUser;

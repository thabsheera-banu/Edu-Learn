import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper ,Button} from '@mui/material';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import BaseUrl from '../BaseUrl';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function CategoryList() {
  const navigate =useNavigate()

    const [categorydata,setCategorydata] = useState([])
    useEffect(()=>{
        try{
            axios.get(BaseUrl+'course/category').then((response)=>{
                setCategorydata(response.data)
            })
        }catch(error){
            console.log(error);
        }
    },[])

    // delete data

    const Swal = require('sweetalert2')
    const  handleDelete = (course_id) =>{
        Swal.fire({
            title : 'confirm',
            text  : 'Do you want to delete it',
            icon  : 'info' ,
            confirmButtonText : 'continue' ,
            showCancelButton  : true ,

        }).then((result) =>{
            if(result.isConfirmed){
                try{
                    axios.delete(BaseUrl+"course/category/" + course_id)
                    .then(() => {
                        Swal.fire("data has been Deleted")
                        try{
                            axios.get(BaseUrl+"course/course-chapter/" + course_id)
                            .then((res) => {
                                setCategorydata(res.data)
                            })
                            navigate('/admin/Categorylist/')


                        }catch(error){
                            console.log(error);
                        }

                    })
                }catch(error){
                    Swal.fire("error","Data has not been deleted !")
                   
                }
            }
            else{
                Swal.fire("error","Data has not been Deleted")

            }

        })

    }
  return (
    <div style={{ minHeight: '100vh' }}>

      <div className='container mt-4'>
        <div className='row'>
          <aside className='col-md-3'>
            <AdminSidebar />
          </aside>

          <div className='col-md-9'>
            <TableContainer component={Paper}>
            <Link to = {'/admin/addCategory/'}>
                                      <Button variant="contained" className='float-end' color="success">
                                          Add Category
                                        </Button>
                                    </Link> 
            
              <Table sx={{ minWidth: 650 }} className='mt-5'>
              
                <TableHead >
                
                  <TableRow sx={{ backgroundColor: 'lightblue' }}>
                    {/* <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell> */}
                    <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>

                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categorydata.map((category) =>
                  <TableRow key={category.id} sx={{ backgroundColor: '' }}>
                    {/* <TableCell>{index+1}</TableCell> */}
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.title}</TableCell>
                    <TableCell>
                    <Link to ={`/admin/AddCategory/${category.id}`}>                   
                                        <IconButton aria-label="edit" color="primary" className='ms-3'>
                                                <EditIcon />
                                        </IconButton>
                                    
                                    </Link> 
                                        <IconButton onClick={() =>handleDelete(category.id)}  aria-label="delete" color="error" className='ms-3'>
                                        <DeleteIcon   />
                                        </IconButton>     
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
  )
}

export default CategoryList

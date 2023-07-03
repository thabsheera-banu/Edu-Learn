import React, { useEffect, useState } from 'react'
import Theader from './Theader'
import TutorSidebar from './TutorSidebar'
import axios from 'axios'
import BaseUrl from '../BaseUrl'
import { Link, useParams } from 'react-router-dom'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Pagination from '../components/Pagination'

function TutorCourses() {
  const[courseData,setcorseData] = useState([])
  const teacherId = localStorage.getItem('teacherId')
  console.log("this id",teacherId);
  const [active, setActive] = useState(null)

  const [currentPage,setCurrentPage] =useState(1);
  const [postsPerPage,setPostPerPage] = useState(4)


  useEffect(()=>{
    try{
      axios.get(BaseUrl+"course/tutor-corse/"+teacherId)
    .then((res) =>{
      setcorseData(res.data)

    })
    }catch(error){
      console.log(error);
    }
    

  },[])
  console.log(courseData);
    const lastPostIndex  = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex- postsPerPage
    const currentPosts = courseData.slice(firstPostIndex,lastPostIndex)

  return (
    <div style={{minHeight:'100vh'}}>
        <Theader/>
        <div className='container mt-4'>
        <div className='row'>
        <aside className='col-md-3'>
           <TutorSidebar/>

        </aside>
        <section className='col-md-9 my-3'>

        

        <table class="table" style={{minHeight:'70vh'}}>
        <thead>
        <h5 className='table-header '>My Courses</h5>
          
        
            <tr>
            <th scope="col">No</th>

            <th scope="col">Name</th>
            <th scope="col">Total Entrolled</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
       {/* {courseData.map((course,index) =>  */}
       {currentPosts.map((course,index) => 

                    <tr key={index+1} onClick={() => setActive(course)} className={`table-${active == course && 'active'}`}>
                      <th>{index+1}</th>
                        <th scope="row"><Link to={'/tutor/all-chapters/'+ course.id}>{course.title}</Link></th>
                        <td>234</td>
                        
                        <td><img src={course.img} width='80' className='rounded' /></td>
                        <td>
                         
                          {/* <Link className=" btn btn-success btn-sm " to={'/add-chapter/'+ course.id} style={{ fontSize: '12px' }}> Chapters</Link> */}
                                   <Link to = {'/add-chapter/'+ course.id}>
                                      <Button variant="contained" color="success">
                                          Add chapter
                                        </Button>
                                    </Link> 
                                    <Link to = {'/tutor/edit-course/' + course.id}>                   
                                        <IconButton aria-label="edit" color="primary" className='ms-3'>
                                                <EditIcon />
                                        </IconButton>
                                    
                                    </Link> 
                                        <IconButton  aria-label="delete" color="error" className='ms-3'>
                                        <DeleteIcon   />
                                        </IconButton>                        </td>
                        


                    </tr>
                    
                    )}
        
        </tbody>
        
        </table>

        </section>
        <Pagination totalPosts={courseData.length} 
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage = {currentPage}

        />

       

        </div>
</div>

</div>
  )
}

export default TutorCourses

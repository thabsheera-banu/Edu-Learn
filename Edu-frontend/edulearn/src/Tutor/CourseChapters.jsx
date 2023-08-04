import React, { useEffect, useState } from 'react'
import TutorSidebar from './TutorSidebar'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import BaseUrl from '../BaseUrl'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import Pagination from '../components/Pagination'
import { Card, CardContent, Typography} from '@material-ui/core';





function CourseChapters() {
    const navigate = useNavigate()
    const [chapterData,setchapterData] = useState([])
    const [totalResult,settotalResult] = useState(0)
    const {course_id} = useParams()
    const [active, setActive] = useState(null)
    const [currentPage,setCurrentPage] =useState(1);
    const [postsPerPage,setPostPerPage] = useState(2)

    useEffect (() => {
        try{
            axios.get(BaseUrl+"course/course-chapter/"+course_id)
            .then((res) => {
                settotalResult(res.data.length)
                setchapterData(res.data)
            })

        }catch(error){
            console.log(error);
        }

    },[])

    
  
    // delete data

    const Swal = require('sweetalert2')
    const  handleDelete = (chapter_id) =>{
        Swal.fire({
            title : 'confirm',
            text  : 'Do you want to delete it',
            icon  : 'info' ,
            confirmButtonText : 'continue' ,
            showCancelButton  : true ,

        }).then((result) =>{
            if(result.isConfirmed){
                try{
                    axios.delete(BaseUrl+"course/chapter/" + chapter_id)
                    .then(() => {
                        Swal.fire("data has been Deleted")
                        try{
                            axios.get(BaseUrl+"course/course-chapter/" + course_id)
                            .then((res) => {
                                settotalResult(res.data.length)
                                setchapterData(res.data)
                            })

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
    const lastPostIndex  = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex- postsPerPage
    const currentPosts = chapterData.slice(firstPostIndex,lastPostIndex)
  return (
    <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <TutorSidebar/>

            </aside>
            <section className='col-md-9'>
            {chapterData.length === 0 ? (
                        <div className="col-md-12 text-center ">
                        <Card className='mt-5'>
                            <CardContent>
                                <Typography variant="h6">No video available here .</Typography>
                                <Button variant="contained" color="primary" onClick={() => { navigate('/add-chapter/'+ course_id) }}>
                                    Add Chapter
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                    ):(
                <div className='card'>
                    <h5 className='card-header'>All Chapters ({totalResult}) 
                               <Link to = {'/add-chapter/'+ course_id}>
                                      <Button className='float-end' variant="contained" color="success">
                                          Add chapter
                                        </Button>
                                    </Link>  
                    </h5>
                    
                    <div className='card-body'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Video</th>
                                    <th>Remarks</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* {chapterData.map((chapter,index) => */}
                                {currentPosts.map((chapter,index) =>

                                <tr key={index+1} onClick={() => setActive(chapter)} className={`table-${active == chapter && 'active'}`}>
                                    <td>{index+1}</td>
                                    <td>{chapter.title}</td>
                                    <td><video controls width="250">
                                        <source src={chapter.video} type="video/webm"/>

                                        <source src={chapter.video} type="video/mp4"/>

                                        Download the
                                        <a href="/media/cc0-videos/flower.webm">WEBM</a>
                                        or
                                        <a href="/media/cc0-videos/flower.mp4">MP4</a>
                                        video.
                                       </video>
                                    </td>
                                    <td> {chapter.remarks} </td>
                                    <td> 
                                    <Link to={'/tutor/edit-chapter/'+ chapter.id}>
                                        <IconButton aria-label="edit" color="primary">
                                                <EditIcon />
                                        </IconButton>
                                    </Link>
                                  
                                        <IconButton  aria-label="delete" color="error" >
                                        <DeleteIcon onClick={ () => handleDelete (chapter.id)}  />
                                        </IconButton>
                               
                                    </td>

                                </tr>

                                )}
                            </tbody>

                        </table>

                    </div>
                  

                </div>
  )}
            </section>
            <Pagination totalPosts={chapterData.length} 
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage = {currentPage}

        />

            
        </div>
      
    </div>
  )
}

export default CourseChapters

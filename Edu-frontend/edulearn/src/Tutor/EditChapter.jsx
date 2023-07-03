import React ,{ useState,useEffect } from 'react'
import axios from 'axios'
import Theader from './Theader';
import TutorSidebar from './TutorSidebar';
import { useParams } from 'react-router';
import BaseUrl from '../BaseUrl';
import Swal from 'sweetalert2'

function EditChapter() {
    const[chapterData,setchapterData] = useState({
        course : '' ,
        title : '',
        description : '',
        prev_video : '',
        video : '',
        remarks : ''


    })
    
    const handleChange =(event) => {
        setchapterData({
            ...chapterData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange =(event) => {
        setchapterData({
            ...chapterData,
            [event.target.name] : event.target.files[0]
        });
    }
    const {chapter_id}=useParams()

    const FormSubmit = () =>{
        const _formData=new FormData();
        _formData.append('course',chapterData.course);
        _formData.append('title',chapterData.title);
        if(chapterData.video !== '') {
        _formData.append('video',chapterData.video,chapterData.video.name);
        }
        _formData.append('description',chapterData.description);
        _formData.append('remarks',chapterData.remarks);
        try{
            axios.put('http://127.0.0.1:8000/course/chapter/'+chapter_id,_formData ,{
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            .then((res) => {
                console.log(res);
                if(res.status === 200){
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
            
            });
        }
        catch(error){
            console.log(error);
        }


    }
    useEffect (() => {
        try{
            axios.get(BaseUrl+"course/chapter/"+chapter_id)
            .then((res) => {
                setchapterData({
                    course : res.data.course,
                    title : res.data.title,
                    description : res.data.description,
                    prev_video : res.data.video,
                    remarks : res.data.remarks ,
                    video : '',

                })
            })

        }catch(error){
            console.log(error);
        }

    },[])
  return (
    <div style={{minHeight:'100vh'}}>
       <Theader/>
    
    <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <TutorSidebar/>

            </aside>
            <section className='col-md-9'>
                <div >
                    {/* <h5 className="">Add Course</h5> */}
                    <div className="card-body">
                        <form action="">
                       
                            <div className="mb-3">
                                <label for='title' className="form-labe">Title</label>
                                <input type="text"id='title' value={chapterData.title} onChange={handleChange} name='title' className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for='description' className="form-label">Description</label>
                                <textarea type="text" value={chapterData.description} onChange={handleChange} name='description' id='discription' className="form-control" ></textarea> 
                            </div>
                            <div className="mb-3">
                                <label for='video' className="form-label">video</label>
                                <input type="file"  id='video' onChange={handleFileChange} name="video" className="form-control" />
                                {chapterData.prev_video && (
                                <video controls width="250" className='mt-3'>
                                    <source src={chapterData.prev_video} type="video/webm"/>

                                    <source src={chapterData.prev_video} type="video/mp4"/>

                                    Download the
                                    <a href="/media/cc0-videos/flower.webm">WEBM</a>
                                    or
                                    <a href="/media/cc0-videos/flower.mp4">MP4</a>
                                    video.
                                </video>
                                )}
                            </div>
                            <div className="mb-3">
                                <label for='techs' className="form-label">Remarks</label>
                                <textarea value={chapterData.remarks} placeholder='php,python,javascripts' onChange={handleChange} name="remarks" className="form-control"></textarea>  
                            </div>
                            <button type='sumbit' onClick={FormSubmit} className="btn btn-primary">Edit Chapter</button>
                        </form>
                    </div>

                </div>
          
            </section>

         </div>
      
    </div>
    </div>
  )
}

export default EditChapter

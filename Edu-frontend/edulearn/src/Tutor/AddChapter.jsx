import React ,{ useState,useEffect } from 'react'
import axios from 'axios'
import Theader from './Theader';
import TutorSidebar from './TutorSidebar';
import { useParams } from 'react-router';
import BaseUrl from '../BaseUrl';

function AddChapter() {
    const[chapterData,setchapterData] = useState({
        title : '',
        description : '',
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
    const {course_id}=useParams()

    const FormSubmit = () =>{
        const _formData=new FormData();
        _formData.append('course',course_id);
        _formData.append('title',chapterData.title);
        _formData.append('video',chapterData.video,chapterData.video.name);
        _formData.append('description',chapterData.description);
        _formData.append('remarks',chapterData.remarks);
        try{
            axios.post(BaseUrl+'course/chapter/',_formData ,{
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            .then((res) => {
                console.log(res.data);
                window.location.href='/add-chapter/4';
            
            });
        }
        catch(error){
            console.log(error);
        }





    }
  return (
    <div style={{minHeight:'100vh'}}>
       {/* <Theader/> */}
    
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
                                <input type="text"id='title' onChange={handleChange} name='title' className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for='description' className="form-label">Description</label>
                                <textarea type="text" onChange={handleChange} name='description' id='discription' className="form-control" ></textarea> 
                            </div>
                            <div className="mb-3">
                                <label for='video' className="form-label">video</label>
                                <input type="file" id='video' onChange={handleFileChange} name="video" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for='techs' className="form-label">Remarks</label>
                                <textarea placeholder='php,python,javascripts' onChange={handleChange} name="remarks" className="form-control"></textarea>  
                            </div>
                            <button type='sumbit' onClick={FormSubmit} className="btn btn-primary">Add Chapter</button>
                        </form>
                    </div>

                </div>
          
            </section>

         </div>
      
    </div>
    </div>
  )
}

export default AddChapter

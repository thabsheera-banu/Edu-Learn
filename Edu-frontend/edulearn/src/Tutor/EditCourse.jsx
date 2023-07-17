import React  from 'react'

import TutorSidebar from './TutorSidebar'
import Theader from './Theader'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import BaseUrl from '../BaseUrl';
import { useParams } from 'react-router'

function EditCource() {
    const[cate,setCategory] = useState([])
    const[courseData,setCoueseData] = useState({
        category : '',
        teacher : '',
        title : '',
        pre_img : '',
        img :'',
        description : '',
        price : '',
        techs : ''


    })

    const {course_id} = useParams()
    useEffect(() => {
        try{
            axios.get(BaseUrl +"course/category").then((res)=>{
                setCategory(res.data)
            });
        }
        catch(error){
            console.log(error);

        }

        // fetch current cource data
        try{
            axios.get(BaseUrl + "course/teacher-cource-detail/" + course_id)
            .then((res) =>{
                setCoueseData({
                    category : res.data.category,
                    teacher : res.data.teacher,
                    title : res.data.title,
                    pre_img : res.data.img,
                    img : '',
                    description : res.data.description,
                    price :res.data.price,
                    techs : res.data.techs


                })

            })

        }catch(error){
            console.log(error);
        }
        // End


    },[])
    // console.log(cate);

    const handleChange =(event) => {
        setCoueseData({
            ...courseData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange =(event) => {
        setCoueseData({
            ...courseData,
            [event.target.name] : event.target.files[0]
        });
    }

    const FormSubmit = () =>{
        const _formData=new FormData();
        _formData.append('category',courseData.category);
        _formData.append('teacher',courseData.teacher);
        _formData.append('title',courseData.title);
        if(courseData.img !== ''){
          _formData.append('img',courseData.img,courseData.img.name);
        } 
        _formData.append('description',courseData.description);
        _formData.append('price',courseData.price);

        _formData.append('techs',courseData.techs);
        try{
            axios.put(BaseUrl + 'course/teacher-cource-detail/' + course_id, _formData ,{
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
                    <h5 className="text-center">Edit Course</h5>
                    <div className="card-body">
                        <form action="">
                        <div className="mb-3">
                                <label for='title' className="form-labe mt-3">Category</label>
                                <select value={courseData.category} name="category" onChange={handleChange} className='form-control'>
                                    <option value="">--Please choose an option--</option>
                                    {cate.map((category,index)=>{
                                        return(<option key={index} value={category.id}>{category.title}</option>)
                                    })}
                                </select>
                                   
                            </div>
                            <div className="mb-3">
                                <label for='title' className="form-labe">Title</label>
                                <input value={courseData.title} type="text"id='title' onChange={handleChange} name='title' className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for='description' className="form-label">Description</label>
                                <textarea value={courseData.description} type="text" onChange={handleChange} name='description' id='discription' className="form-control" ></textarea> 
                            </div>
                            <div className="mb-3">
                                <label for='video' className="form-label">Featured image</label>
                                <input type="file" id='video' onChange={handleFileChange} name="img" className="form-control" />
                                {courseData.pre_img &&(
                                    <img src={courseData.pre_img} width="300"/>
                                )}
                            </div>
                            <div className="mb-3">
                                <label for='price' className="form-labe">Price</label>
                                <input value={courseData.price} type="number"id='price' onChange={handleChange} name='price' className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for='techs' className="form-label">Technologies</label>
                                <textarea value={courseData.techs} placeholder='php,python,javascripts' onChange={handleChange} name="techs" className="form-control"></textarea>  
                            </div>
                            <button type='sumbit' onClick={FormSubmit} className="btn btn-primary">Submit</button>
                        </form>
                    </div>

                </div>
          
            </section>

         </div>
      
    </div>
    </div>
  )
}

export default EditCource

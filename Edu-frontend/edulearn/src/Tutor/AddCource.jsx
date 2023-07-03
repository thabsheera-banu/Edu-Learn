import React, { useContext } from 'react'

import TutorSidebar from './TutorSidebar'
import Theader from './Theader'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useParams } from 'react-router'

function AddCource() {
    
    const [cate, setCategory] = useState([])
    const [courseData, setCoueseData] = useState({
        category: '',
        title: '',
        img: '',
        description: '',
        techs: '',


    })
    useEffect(() => {
        try {
            axios.get("http://127.0.0.1:8000/course/category").then((res) => {
                setCategory(res.data)
            });
        }
        catch (error) {
            console.log(error);

        }


    }, [])
    
    // console.log(cate);

    const handleChange = (event) => {
        setCoueseData({
            ...courseData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setCoueseData({
            ...courseData,
            [event.target.name]: event.target.files[0]
        });
    }

    const FormSubmit = () => {
        const teacherId = localStorage.getItem('teacherId')
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', teacherId);
        _formData.append('title', courseData.title);
        _formData.append('img', courseData.img, courseData.img.name);
        _formData.append('description', courseData.description);
        _formData.append('techs', courseData.techs);

        console.log("form data from frontend", _formData)

        try {
            axios.post('http://127.0.0.1:8000/course/course/', _formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    console.log(res.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Course added suessfully',

                    });
                });
        }
        catch (error) {
            console.log(error);
        }





    }

    console.log('course data ', courseData)

    return (
        <div style={{ minHeight: '100vh' }}>
            <Theader />

            <div className='container mt-4'>
                <div className='row'>
                    <aside className='col-md-3'>
                        <TutorSidebar />

                    </aside>
                    <section className='col-md-9'>
                        <div >
                            {/* <h5 className="">Add Course</h5> */}
                            <div className="card-body">
                                <form action="">
                                    <div className="mb-3">
                                        <label for='title' className="form-labe">Category</label>
                                        <select name="category" value={courseData.category} onChange={handleChange} className='form-control'>
                                            <option value="">--Please choose an option--</option>
                                            {cate.map((category, index) => {
                                                return <option key={index} value={category.id}>{category.title}</option>
                                            })}
                                        </select>

                                    </div>
                                    <div className="mb-3">
                                        <label for='title' className="form-labe">Title</label>
                                        <input type="text" id='title' onChange={handleChange} name='title' className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label for='description' className="form-label">Description</label>
                                        <textarea type="text" onChange={handleChange} name='description' id='description' className="form-control" ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label for='video' className="form-label">Featured image</label>
                                        <input type="file" id='video' onChange={handleFileChange} name="img" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label for='techs' className="form-label">Technologies</label>
                                        <textarea placeholder='php,python,javascripts' onChange={handleChange} name="techs" className="form-control"></textarea>
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

export default AddCource

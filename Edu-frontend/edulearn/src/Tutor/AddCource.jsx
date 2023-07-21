import React, { useContext } from 'react';
import * as Yup from 'yup';
import TutorSidebar from './TutorSidebar';
import Theader from './Theader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';
import BaseUrl from '../BaseUrl';
import { Link } from 'react-router-dom';

function AddCource() {
  const [cate, setCategory] = useState([]);

  const [courseData, setCourseData] = useState({
    category: '',
    title: '',
    img: '',
    description: '',
    price: '',
    techs: '',
  });

  useEffect(() => {
    try {
      axios.get(BaseUrl + 'course/category').then((res) => {
        setCategory(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const courseSchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    title: Yup.string().trim().required('Title is required').strict(true),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    img: Yup.mixed().required('Featured image is required'),
    techs: Yup.string().required('Technologies are required'),
  });

  const handleChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.files[0],
    });
  };

  const FormSubmit = async () => {
    try {
      await courseSchema.validate(courseData, { abortEarly: false });
      const teacherId = localStorage.getItem('teacherId');
      const formData = new FormData();
      formData.append('category', courseData.category);
      formData.append('teacher', teacherId);
      formData.append('title', courseData.title);
      formData.append('img', courseData.img, courseData.img.name);
      formData.append('description', courseData.description);
      formData.append('price', courseData.price);
      formData.append('techs', courseData.techs);

      axios
        .post(BaseUrl + 'course/course/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Course added successfully',
          });
        });
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      let errorMessage = '';
    Object.values(errors).forEach((message) => {
      errorMessage += message + '\n';
    });
      console.log(errors);
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: errorMessage,
      }); // You can handle errors as you like (e.g., show them on the form)
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className='container mt-4'>
        <div className='row'>
          <aside className='col-md-3'>
            <TutorSidebar />
          </aside>
          <section className='col-md-9'>
            <div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor='category' className="form-label">Category</label>
                    <select name="category" value={courseData.category} onChange={handleChange} className='form-control'>
                      <option value="">--Please choose an option--</option>
                      {cate.map((category, index) => (
                        <option key={index} value={category.id}>{category.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor='title' className="form-label">Title</label>
                    <input type="text" id='title' onChange={handleChange} name='title' className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor='description' className="form-label">Description</label>
                    <textarea type="text" onChange={handleChange} name='description' id='description' className="form-control" ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor='description' className="form-label">Price</label>
                    <input type="number" onChange={handleChange} name='price' id='price' className="form-control" ></input>
                  </div>
                  <div className="mb-3">
                    <label htmlFor='img' className="form-label">Featured image</label>
                    <input type="file" id='img' onChange={handleFileChange} name="img" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor='techs' className="form-label">Technologies</label>
                    <textarea placeholder='php,python,javascripts' onChange={handleChange} name="techs" className="form-control"></textarea>
                  </div>
                  <button type='button' onClick={FormSubmit} className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AddCource;

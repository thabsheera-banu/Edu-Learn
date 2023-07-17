import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';
import BaseUrl from '../BaseUrl';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router';

function AddCategory() {
  const navigate = useNavigate();
  const { categoryId } = useParams(); 
  console.log("category id",categoryId);

  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryData, setCategoryData] = useState({
    title: '',
    detail: '',
  });

  // Fetch the category data for editing if in edit mode
  useEffect(() => {
    if (categoryId) {
      setIsEditMode(true);
      // Fetch the category data for editing using the category ID
      axios
        .get(BaseUrl + 'course/category/' + categoryId)
        .then((response) => {
          const { title, detail } = response.data;
          setCategoryData({
            title: title,
            detail: detail,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [categoryId]);
  
  const handleChange = (event) => {
    setCategoryData({
      ...categoryData,
      [event.target.name]: event.target.value,
    });
  };

  const FormSubmit = () => {
    const formdata = new FormData();
    formdata.append('title', categoryData.title);
    formdata.append('detail', categoryData.detail);
    try {
      if (isEditMode) {
        // If in edit mode, update the category
        axios
          .put(BaseUrl + 'course/category/' + categoryId, formdata, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Category updated successfully',
            });
            navigate('/admin/Categorylist/');
          });
      } else {
        // If in add mode, add a new category
        axios
          .post(BaseUrl + 'course/category/', formdata, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Category added successfully',
            });
            navigate('/admin/Categorylist/');
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      <div className='container mt-4'>
        <div className='row'>
          <aside className='col-md-3'>
            <AdminSidebar />
          </aside>

          <div className='col-md-9'>
            <div className='card'>
              <div className='card-header'>
                <h4>{isEditMode ? 'Edit Category' : 'Add Category'}</h4>
              </div>
              <div className='card-body'>
                <form>
                  <div className='mb-3'>
                    <label htmlFor='title' className='form-label'>
                      Title
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='title'
                      name='title'
                      value={categoryData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='description' className='form-label'>
                      Description
                    </label>
                    <textarea
                      className='form-control'
                      id='detail'
                      rows='4'
                      name='detail'
                      value={categoryData.detail}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={FormSubmit}
                  >
                    {isEditMode ? 'Update' : 'Add'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;

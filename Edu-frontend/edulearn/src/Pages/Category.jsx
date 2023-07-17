import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BaseUrl from '../BaseUrl'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function Category() {
    const [categoryData, setCategory] = useState([]);

  useEffect(() => {
    try {
      axios.get(BaseUrl + 'course/category/').then((res) => {
        setCategory(res.data); // Set the response data to the 'categoryData' state
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
        <Navbar/>
    <div className="text-center container py-5">
      <h4 className="mt-4 mb-5"><strong>All Categories</strong></h4>
      <div className="row">
        {categoryData.map((row, index) => (
          <div className="col-lg-3 col-md-12 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                  <h5 className="card-title mb-3"><Link to={`/course/${row.id}`}>{row.title}({row.total_courses})</Link></h5>
                <h6 className="mb-3">{row.detail}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Category

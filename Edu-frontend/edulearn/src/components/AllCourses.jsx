import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
import BaseUrl from '../BaseUrl'
import Navbar from './Navbar'

function AllCourses() {
    const[course,setCourse]=useState([])
    useEffect(() => {
        try {
          axios.get(BaseUrl+'course/course/').then((res) => {
            setCourse(res.data);
          });
        } catch (error) {
          console.log(error);
        }
      }, []);
      
    
  return (
    <div>
      <Navbar/>
    <div className="container mt-4">
        <h3 className="pb-1 mb-4">Latest Courses </h3>
        <div className="row">
        {course && course.map((cate,index)=>{return(
            <div className="col-md-3 mb-4" key={index}>
            <div className="card" >
                <Link to={"/detail/"+cate.id}><img src={cate.img} className="card-img-top" alt="..."/></Link>
                <div className="card-body">
                    <h5 className="card-title" ><Link to={"/detail/"+cate.id}>{cate.title}</Link></h5>
                </div>   
            </div>
            </div>
              )})}

            


            

        </div>

        {/* pagination start */}

        <nav aria-label="Page navigation example mt-5 ">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
       </nav>
        {/* end pagination */}
        </div>
        </div>
  )
}

export default AllCourses

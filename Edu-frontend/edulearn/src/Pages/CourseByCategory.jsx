import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import BaseUrl from '../BaseUrl'

function CourseByCategory() {
    const [courseData,setCourseData] = useState([])
    const {category_id} = useParams()
    useEffect(()=>{
        try{
            axios.get(BaseUrl+'course/course/?category='+category_id)
            .then((res)=>{
                setCourseData(res.data.results)
            })

        }catch(error){
            console.log(error);
        }
    },[])
  return (
    <div>
      <Navbar/>
    <div className="container mt-4">
        <h3 className="pb-1 mb-4">Latest Courses </h3>
        <div className="row">
        {courseData && courseData.map((cate,index)=>{return(
            <div className="col-md-3 mb-4" key={index}>
            <div className="card" >
                <Link to={"/detail/"+cate.id}><img src={cate.img} className="card-img-top" alt="..."/></Link>
                <div className="card-body">
                <div className="card-title mb-3 text-center "  >{cate.title}  </div>
                    <div className="text-center mb-2">Created By:<span> {cate.teacher.full_name}</span></div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {cate.price !== 0 ?
                                              <button className="price-button round-button bg-primary" style={{ backgroundColor: '#202020', color: 'white', borderRadius: '50%', width: '50px', height: '30px' }}>
                                                ₹ {cate.price}
                                              </button>
                                                    :
                                              <button className="price-button round-button bg-success" style={{ backgroundColor: 'bg-primary', color: 'white', borderRadius: '50%', width: '50px', height: '30px' }}>
                                                                                Free
                                              </button>
                                            }
                     </div>
                </div>  

            </div>
            </div>
              )})}

            


            

        </div>
        </div>
        </div>
  )
}

export default CourseByCategory

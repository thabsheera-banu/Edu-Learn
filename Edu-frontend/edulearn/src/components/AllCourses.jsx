import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
import BaseUrl from '../BaseUrl'
import Navbar from './Navbar'
const baseurl = BaseUrl+'course/course/'

function AllCourses() {
    const[course,setCourse]=useState([])
    const [next,setnext] = useState()
    const [previous,setPrevious] = useState()
    useEffect(() => {
        fetchdata(baseurl)
      }, []);

    const paginationhandler = (url)=>{
      fetchdata(url)
      

    }

  function fetchdata(url) {
    try{
      axios.get(url).then((res)=>{
        setnext(res.data.next)
        setPrevious(res.data.previous)
        setCourse(res.data.results)

      })

    }catch(error){
      console.log(error);
    }

  }
      
    
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

        {/* pagination start */}

        <nav aria-label="Page navigation example mt-5 ">
            <ul className="pagination justify-content-center">
            {previous &&(
                <li className="page-item">
               
                <button onClick={()=>paginationhandler(previous)} className="page-link"  aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </button>
              
                </li>
                  )}
                  {next &&(
                <li className="page-item">
                <button onClick={()=>paginationhandler(next)} className="page-link"  aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </button>
                </li>
                )}
            </ul>
       </nav>
        {/* end pagination */}
        </div>
        </div>
  )
}

export default AllCourses

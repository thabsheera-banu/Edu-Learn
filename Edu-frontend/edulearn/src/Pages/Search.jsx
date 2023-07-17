import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
import BaseUrl from '../BaseUrl'
import Navbar from '../components/Navbar';


function Search() {
    const[course,setCourse]=useState([])
    const {searchstring} = useParams()
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(BaseUrl + 'course/search/' + searchstring);
          setCourse(response.data.results);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [searchstring]);

    
      
    
  return (
    <div>
      <Navbar/>
    <div className="container mt-4">
    <h3 className="pb-1 mb-4">Latest Courses </h3>
        <div className="row">
          
        {  course && course.map((cate,index)=>{return(
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
              )})
              
                                          }
            
             
            


            

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

export default Search

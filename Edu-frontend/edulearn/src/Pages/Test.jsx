import { Link, useNavigate, useParams } from "react-router-dom";
import YouTubeIcon from '@mui/icons-material/YouTube';


// import '../components/css/home.css'
import { Navbar } from "react-bootstrap";

function CourseDetail() {
  

  return (

    <div style={{minHeight:'100vh'}}>
      <Navbar />
      <div className="container mt-5">
          return (
            <div className="row" >
              <div className="col-4 ">
                <div style={{ width: "20rem",textAlign:'left' }}>
                  <Link to="/details/1" style={{ margin: 'auto' }}><img style={{ height: "250px", width: "100%",objectFit:'cover' }} src=""className="card-img-top" alt="..." />
                  </Link>
                  <div className="card-body">
                    <Link style={{ textDecoration: "none",color:'black',fontSize:'25px',fontWeight:'bold',  }} to="/details/1" className="card-title">title</Link>
                   
                      <span className="float-end fs-6 mt-2"><button  title="add in your wishlist" className="btn btn-outline-danger"><i className="bi bi-heart"></i></button></span>
                  
                      <span className="float-end fs-6 mt-2"><button  title="remove from  your wishlist" className="btn btn-danger"><i className="bi bi-heart"></i></button></span>
                 
                  </div>
                  <div className="card-footer">
                  
                    {/* <span>Rating : 4.5/5</span> */}
                    <div style={{fontSize:'30px',fontWeight:'bolder'}}> ₹89</div>
                    
                  </div>
                </div>

              </div>

              <div className="col-8 bg-light border border-dark p-1 ">
                <div>
                 
                    <h1>title <span className="float-end fs-5 btn btn-light" style={{ cursor: "default" }}>
                      Free</span> </h1> 
                    <h1>title <span className="float-end fs-5 btn btn-light" style={{ cursor: "default" }}>
                      ₹56</span> </h1>

                  
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio iusto odit accusamus doloribus eius atque blanditiis, vero incidunt alias tenetur error eligendi nulla voluptatibus aut quidem. Voluptas delectus aliquid assumenda omnis eum, error autem soluta magnam quibusdam atque excepturi laborum ab temporibus obcaecati qui quae! Nisi autem hic corrupti cumque itaque modi corporis nihil! Perspiciatis, quis? Corrupti adipisci, dolorum, minus magnam minima iste saepe tempora blanditiis asperiores, enim autem consectetur aspernatur dolorem. Aspernatur esse facere odio tenetur harum, alias quam neque, quidem doloremque incidunt, laudantium laborum adipisci. Odio temporibus pariatur nulla fugit? Veniam praesentium voluptatum odit libero rem, perspiciatis ipsa!</p>
                  <p style={{textAlign:'left'}}><b>Created by        : </b><Link to="/user_details/1" style={{ textDecoration: "None" }}>full</Link> 12/12/12</p>
                  <p style={{textAlign:'left'}}><b>Duration          : </b>3 Hours</p>
                  <p style={{textAlign:'left'}}><b>Enrolled Students : </b>6 Students</p>
                  
                

                    <div style={{backgroundColor:'green',color:'white',padding:'5px',borderRadius:'10px'}} className="float-end">You Are Entrolled</div>
                   
                
                      <button className="btn btn-outline-primary btn-lg float-end" >Free Entroll</button>
                      
                      <button  className="btn btn-outline-primary btn-lg float-end">Buy Now</button>

                 
                </div>
              </div>

            </div>
          )
     

        <div className=" mt-5 border-right-0" >
          <div className="card-header h3 bg-dark text-white fst-italic">
            Course content
          </div>
          <ul className="list-group  ">
            
                <li className="list-group-item listClass" style={{fontSize:'20px',fontWeight:'bold',textAlign:'left'}}  ><span className="me-2"> Chapter :</span> 
                 chapter
                  <span className="float-end me-3" style={{fontSize:'13px',fontWeight:'normal'}}>
                    <span className="m-auto" >10 Minutes</span>

                   
                      <>
                        <button className="btn btn-sm float-end" data-bs-toggle="modal" data-bs-target="#exampleModal1" ><YouTubeIcon /></button>
                        <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"></h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <div className="ratio ratio-16x9">
                                  {/* <iframe src={imageFolder+chapter.video} title="" frameborder="0" allowfullscreen></iframe>  */}
                                  <video controls autoplay width='200'>
                                    <source type='video/webm' />
                                    <source  type='video/mp4'></source>

                                  </video>

                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </>




                    {/* End Video Modal */}

                  </span>
                </li>
            

          </ul>
        </div>

        <h3 className="border-bottom pd-1 mt-5">Related Courses </h3>
        <div className="row">
         
              <div className=" col-12 col-md-6 col-lg-3 mt-4" >
                <div>
                  <Link to="" ><img style={{ height: "200px",width: "100%",objectFit:'cover'}} src="" className="card-img-top" alt="..." />
                  </Link>
                  <div className="card-body" style={{textAlign:'left'}}>
                    <Link to="" className="card-title" style={{textDecoration:'none',fontSize:'25px',fontWeight:'bold',color:'black'}}>title</Link>

                  </div>
                  <div className="card-footer">
                   
                    <div style={{textAlign:'left'}}>₹45</div>
                  </div>
                </div>
              </div>
          





        </div>


      </div>;


    </div>


  );
}

export default CourseDetail
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import BaseUrl from '../BaseUrl'
import { Carousel } from 'react-bootstrap';
import Button from '@mui/material/Button';
import './home.css'
function Home() {
    const [course, setCourse] = useState([])
    const [testimonialDta, setTestimonialData] = useState([])
    useEffect(() => {
        try {
            axios.get(BaseUrl + 'course/course/?result=4').then((res) => {
                setCourse(res.data.results);
            });
        } catch (error) {
            console.log(error);
        }

        //fetch student testimonial

        // try{
        //     axios.get(BaseUrl+"course/student-testimonial")
        //     .then((res)=>{
        //         setTestimonialData(res.data)
        //     })

        // }catch(error){
        //     console.log(error);
        // }
    }, []);


    return (
        <div style={{ backgroundColor: "#eee" }}>
            <Navbar home={true} />

            <div className="carousel-container  ">
                <Carousel >
                    <Carousel.Item >
                        <img
                            className="d-block object-cover w-100 "
                            // style={{ height: "25rem" }}
                            src="c6.jpg"
                            alt="First slide"

                        />
                        <Carousel.Caption className="carousel-caption ">
                            <div className="shadow-card  float-end  "   >
                                <h3 className="caption-text " style={{ marginBottom: "10px" }} >Learning that gets you</h3>
                                <span className="ms-3" >Learning unlimited Courses with Edulern .Get started with us. </span>
                                <br ></br>
                                <Link to="/category">
                                <button className="btn btn-transparent" style={{ marginTop: "10px" }}>Get Start</button>
                                </Link>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>







            {/* new----------------------------------------------------------- */}

            {/* <section > */}

            <div className=" container py-5 ">
                <h3 className="mt-4 mb-3"><strong>Expand your career opportunities with EduLearn</strong></h3>
                <span>Take one of EduLearn range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to...</span>
                <br className="mb-3"></br>
                <Link to="/all-cources">
                    <Button className="btn " style={{ marginTop: "20px" }} variant="contained" color="success">See All</Button>
                </Link>


                <div className="row " style={{ marginTop: "30px" }}>
                    {course && course.map((cate, index) => {
                        return (
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="card">
                                    <div className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                                        data-mdb-ripple-color="light">
                                        <Link to={"/detail/" + cate.id}>
                                            <img src={cate.img}

                                                className="w-100" /></Link>
                                        <a href="#!">

                                            <div className="hover-overlay">
                                                <div className="mask1" ></div>
                                            </div>
                                        </a>
                                    </div>
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

                        )
                    })}


                </div>


            </div>
            
            {/* </section> */}

          

            <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <img class="card-img-top" src="c7.jpg" alt=""/>
        </div>
      </div>
      <div class="col-md-6">
        <div class="">
          <div class="">
            <span class="subheading">Enhanced Your Skills</span>
            <h2 style={{ marginTop: "10px" }} class="mb-4">Learn Anything You Want Today</h2>
            <p style={{ marginTop: "30px" }}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
            <p><a href="#" class="btn btn-primary " style={{ marginTop: "50px" }}>Get in touch with us</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>




            <section >
                <div className="text-center container py-5">
                    <h4 className="mt-4 mb-5"><strong>Popular Courses</strong></h4>

                    <div className="row">
                        {course && course.map((cate, index) => {
                            return (
                                <div className="col-lg-3 col-md-12 mb-4">
                                    <div className="card">
                                        <div className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                                            data-mdb-ripple-color="light">
                                            <Link to={"/detail/" + cate.id}>
                                                <img src={cate.img}

                                                    className="w-100" /></Link>
                                            <a href="#!">
                                                <div className="mask">

                                                </div>
                                                <div className="hover-overlay">
                                                    <div className="mask1" ></div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            <a href="" className="text-reset">
                                                <Link className="card-title mb-3" to={"/detail/" + cate.id}>{cate.title}</Link>
                                            </a>

                                            <h6 className="mb-3"> ₹ {cate.price}</h6>
                                        </div>
                                    </div>
                                </div>

                            )
                        })}


                    </div>


                </div>
                <h3 className="pb-1 mb-4 mt-5 text-center">Student Testimonial </h3>

                <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </figcaption>
                            </figure>                </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </figcaption>
                            </figure>                </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </figcaption>
                            </figure>                </div>
                    </div>

                    {/* <div className="carousel-indicators">
        {testimonialDta && testimonialDta.map((row,index)=>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current="true" aria-label="Slide 1"></button>
        )}
    </div>
    <div className="carousel-inner">
    {testimonialDta && testimonialDta.map((row,i)=>

        <div className={i ===0 ? "carousel-item text-center active" : "carousel-item text-center"}>
            <figure className="text-center">
                <blockquote className="blockquote">
                    <p>{row.reviws}</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                    {row.course.title} <cite title="Source Title">{row.student.full_name}</cite>
                </figcaption>
            </figure>               
         </div>
        
        )}

    </div> */}
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


            </section>
            {/* end new */}


            {/* old------------------------------------------------------               */}

            {/* <div className="container mt-4">
                <h3 className="pb-1 mb-4">
                    Latest Courses
                    <Link to="/all-courses">
                        <Button className="float-end" size="small" color="primary">
                            See all
                        </Button>
                    </Link>
                </h3>
                <div className="row">
                    {course && course.map((cate, index) => {
                        return (

                            <div className="col-md-3" key={index}>
                                <div className="home_card" >
                                    <Link to={"/detail/" + cate.id}><img src={cate.img} className="card-img-top" alt="..." /></Link>
                                    <div className="home_card-body">
                                        <Link className="home_card-title" to={"/detail/" + cate.id}>{cate.title}</Link>
                                       <div className = "button_container" >
                                        <button className="home_card-text"> ₹ 300</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )
                    })}

                    


                </div>





               <h3 className="pb-1 mb-4 mt-5">Popular Courses <a href="#" className="float-end">See all</a></h3>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card" >
                            <a href=""><img src="c1.jpeg" className="card-img-top" alt="..." /></a>
                            <div className="card-body">
                                <h5 className="card-title" ><a href="#">Course title</a></h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card" >
                            <img src="c1.jpeg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Course title</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12 mb-4">
        <div className="card">
          <div
            className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light"
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
              className="w-100"
            />
            <a href="#!">
              <div className="mask">
                <div className="d-flex justify-content-start align-items-end h-100">
                  <h5>
                    <span className="badge bg-primary ms-2">New</span>
                  </h5>
                </div>
              </div>
              <div className="hover-overlay">
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                />
              </div>
            </a>
          </div>
          <div className="card-body">
            <a href="" className="text-reset">
              <h5 className="card-title mb-3">Product name</h5>
            </a>
            <a href="" className="text-reset">
              <p>Category</p>
            </a>
            <h6 className="mb-3">$61.99</h6>
          </div>
        </div>
      </div>

                </div> 









                <h3 className="pb-1 mb-4 mt-5">Popular Teachers <a href="#" className="float-end">See all</a></h3>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card" >
                            <a href=""><img src="c1.jpeg" className="card-img-top" alt="..." /></a>
                            <div className="card-body">
                                <h5 className="card-title" ><a href="#">Teacher name</a></h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card" >
                            <img src="c1.jpeg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Course title</h5>
                            </div>
                        </div>
                    </div>

                </div>


                <h3 className="pb-1 mb-4 mt-5">Student Testimonial </h3>

                <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </figcaption>
                            </figure>                </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </figcaption>
                            </figure>                </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </figcaption>
                            </figure>                </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>



            </div> */}
        </div>


    );
}

export default Home;

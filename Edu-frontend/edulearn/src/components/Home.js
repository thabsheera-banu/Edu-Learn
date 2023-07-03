import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect,useState } from 'react'
import axios from 'axios'
import BaseUrl from '../BaseUrl'
import { Carousel } from 'react-bootstrap';
import Button from '@mui/material/Button';
import './home.css'
function Home() {
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
          
            <Carousel className="carousel-container">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="c1.jpg"
                    alt="First slide"
                />
                <Carousel.Caption className="carousel-caption">
                    <h3>Welcome to our Learning Platform</h3>
                    <p>Discover new courses and enhance your skills.</p>
                    <Link to="/all-courses" className="btn btn-primary btn-transparent">Browse Courses</Link>
                </Carousel.Caption>
                </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="c2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Learn from Industry Experts</h3>
            <p>Get insights and guidance from experienced professionals.</p>
            <Link to="/teachers" className="btn btn-primary btn-transparent">Meet Our Teachers</Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="container mt-4">
      <h3 className="pb-1 mb-4">
        Latest Courses
                    <Link to="/all-courses">
                        <Button className="float-end" size="small" color="primary">
                        See all
                        </Button>
                    </Link>
                    </h3>       
                     <div className="row">
        {course && course.map((cate,index)=>{return(

            <div className="col-md-3" key={index}>
            <div className="card" >
                <Link to={"/detail/"+cate.id}><img src={cate.img} className="card-img-top" alt="..."/></Link>
                <div className="card-body">
                    <h5 className="card-title" ><Link to={"/detail/"+cate.id}>{cate.title}</Link></h5>
                    <p className="card-text"> ₹ 300</p>
                </div>   
            </div>
            </div>
         )})}


          </div> 

 



        <h3 className="pb-1 mb-4 mt-5">Popular Courses <a href="#" class="float-end">See all</a></h3>
        <div className="row">
            <div className="col-md-3">
            <div className="card" >
                <a href=""><img src="c1.jpeg" className="card-img-top" alt="..."/></a>
                <div className="card-body">
                    <h5 className="card-title" ><a href="#">Course title</a></h5>
                </div>   
            </div>
            </div>

            <div className="col-md-3">
            <div className="card" >
                <img src="c1.jpeg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Course title</h5>
                </div>   
            </div>
            </div>

        </div>

        


        


        <h3 className="pb-1 mb-4 mt-5">Popular Teachers <a href="#" class="float-end">See all</a></h3>
        <div className="row">
            <div className="col-md-3">
            <div className="card" >
                <a href=""><img src="c1.jpeg" className="card-img-top" alt="..."/></a>
                <div className="card-body">
                    <h5 className="card-title" ><a href="#">Teacher name</a></h5>
                </div>   
            </div>
            </div>

            <div className="col-md-3">
            <div className="card" >
                <img src="c1.jpeg" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Course title</h5>
                </div>   
            </div>
            </div>

        </div>


        <h3 className="pb-1 mb-4 mt-5">Student Testimonial </h3>

        <div id="carouselExampleIndicators" class="carousel slide bg-dark text-white py-5" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <figure class="text-center">
                    <blockquote class="blockquote">
                        <p>A well-known quote, contained in a blockquote element.</p>
                    </blockquote>
                    <figcaption class="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </figcaption>
                    </figure>                </div>
                <div class="carousel-item">
                <figure class="text-center">
                    <blockquote class="blockquote">
                        <p>A well-known quote, contained in a blockquote element.</p>
                    </blockquote>
                    <figcaption class="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </figcaption>
                    </figure>                </div>
                <div class="carousel-item">
                <figure class="text-center">
                        <blockquote class="blockquote">
                            <p>A well-known quote, contained in a blockquote element.</p>
                        </blockquote>
                        <figcaption class="blockquote-footer">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                        </figcaption>
                        </figure>                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
        
        
        
      </div>
      </div>

      
    );
  }
  
  export default Home;
  
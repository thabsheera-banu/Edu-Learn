


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import BaseUrl from '../BaseUrl';
import Navbar from '../components/Navbar';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import LockIcon from '@mui/icons-material/Lock';
import './coursedetail.css'


function CourceDetail() {
  const [chapterData, setChapterData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [relatedcourseData, setrelatedcourseData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loginStatus, setLoginstaus] = useState();
  const [entrolstatus, setEntrollstatus] = useState();
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()
  let { cource_id } = useParams();
  const studentId = localStorage.getItem('StudentId')


  useEffect(() => {
    try {
      axios.get(BaseUrl + "course/teacher-corses/" + cource_id + "/")
        .then((res) => {
          setCourseData(res.data);
          setChapterData(res.data.course_chapters);
          setTeacherData(res.data.teacher);
          setrelatedcourseData(JSON.parse(res.data.related_videos));



          // setrelatedcourseData(res.data.related_videos);
        });
    } catch (error) {
      console.log(error);
    }

    //fetch entroll status
    try {
      axios.get(BaseUrl + 'course/fetch-entroll-status/' + studentId + "/" + cource_id)
        .then((res) => {
          if (res.data.bool === true) {
            setEntrollstatus('success')

          }
        })

    } catch (error) {
      console.log(error);
    }

    const studentLoginstatus = localStorage.getItem('studentLoginstatus')
    if (studentLoginstatus === 'true') {
      setLoginstaus('success')

    }
  }, []);

  // const entrollCource = () => {
  //   const studentId = localStorage.getItem('StudentId')
  //   const _formData = new FormData();
  //   _formData.append('course', cource_id);
  //   _formData.append('student ', studentId);

  //   try {
  //     axios.post(BaseUrl + "course/student-entroll-course", _formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     }).then((res) => {
  //       if (res.status === 200) {
  //         Swal.fire({
  //           title: 'successfully entrolled this course',
  //           icon: 'success',
  //           toast: true,
  //           timer: 3000,
  //           position: 'top-right',
  //           timerProgressBar: true,
  //           showConfirmButton: false


  //         })
  //         setEntrollstatus('success')

  //       }
  //     })

  //   } catch (error) {
  //     console.log(error);
  //   }

  // }



  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setShowModal(false);
  };



  



// Rest of the code...



// const handleCheckout = () => {
//   console.log('clicked handle checkout');
//   navigate("/checkout");

// };
const freeEntroll = () => {
  const StudentId =localStorage.getItem('StudentId')

  const _formData = new FormData();
  _formData.append('course', cource_id);
  _formData.append('student', StudentId);
  _formData.append('isPaid', true)
  _formData.append('order_amount', courseData.price)

  try {
    // const UserToken = JSON.parse(localStorage.getItem('access_token')).access
    axios.post(BaseUrl + 'course/free_entroll/', _formData,
    //  {
    //   headers: { "Authorization": `Bearer ${UserToken}` 
    // }
    // }
    ).then((res) => {
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          title: 'This course has been Entrolled',
          showConfirmButton: false,
          timer: 5000,
          toast: true,
          timerProgressBar: true

        });
        // window.location.reload();
      }
    })
  } catch (error) {
    console.log(error);

  }

}







return (
  <div>
    <Navbar />
    <div className="container mt-5 ">
      <div className="card ">
        <div className="card-body ">
          <div className="row">

            {/* --- */}
            
            <div className="col-md-8  " >
            <h3 className="card-title">{courseData.title}</h3>
                          <span className="card-text mt-1" >{courseData.description}</span>

            <p className="card-text fw-bold mt-1">Course By : <a >{teacherData.full_name}</a></p>
              <p className="card-text fw-bold mt-1">Techs     : <a >{courseData.techs}</a></p>
              <p className="card-text fw-bold mt-1">Duration: <a >3 hours</a></p>
              <p className="card-text fw-bold mt-1">Total Enrolled: <a >{courseData.total_entrolled_students}</a></p>
              <p className="card-text fw-bold mt-1">Rating: <a >4.5/5</a></p>
              
            </div>
            <div className="col-md-4"> 
            <img src={courseData.img} className="card-img " alt="course image" />
            {courseData.price === 0 ?
              <p className="card-text fw-bold mt-1">Rs: <a href="#">Free</a></p>
              :
              <p className="card-text text-center fw-bold mt-1">Rs: <a >₹{courseData.price}</a></p>
               }


              <div>
             
                   
              </div>
             

{entrolstatus ?

<Button variant="contained" color="info" className='mt-3 ms-5'>You Are Entrolled</Button>
:
courseData.price === 0 ?
  <Button variant="contained" color="success" className='mt-3' onClick={() => { freeEntroll(); setLoad(!load)  }}>Free Entroll</Button>
  :
  <Button onClick={() => navigate('/payment', { state: { course_id: courseData.id, amount: courseData.price, name: courseData.title } })} variant="contained" color="success" className='mt-3'>Buy Now</Button>

}




              {/* {entrolstatus === 'success' && loginStatus === 'success' &&
                <p className='mt-3'><span>you have already entroll this course</span></p>
              }
              {loginStatus === 'success' && entrolstatus !== 'success' &&
                <Button onClick={entrollCource} variant="contained" color="success" className='mt-3'>
                  Buy Now
                </Button>
              }

              {loginStatus !== 'success' &&
                <Button variant="contained" color="success" className='mt-3'>
                  please entroll This course
                </Button>
              } */}
            </div>
          </div>
        </div>
      </div>

      {/* Course Video */}
      <div className="card mt-5 ">
        <div className="card-header">Course Videos</div>
        <ul className="list-group list-group-flush">
          {chapterData.map((chapter, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
              {chapter.title}
              <div>
                <span className="me-5">1 hr 30 minutes</span>
                {entrolstatus === 'success' || courseData.price === 0 ? (
                <IconButton aria-label="YouTube" color="error" onClick={() => handleVideoClick(chapter.video)}>
                  <YouTubeIcon />
                </IconButton>
                 ) : (
                  <span><LockIcon /></span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Modal */}
      {selectedVideo && showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{chapterData.find(chapter => chapter.video === selectedVideo)?.title}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <video controls width="100%" autoPlay>
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      )}

      <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
      <div className="row">
        {relatedcourseData.map((rcourse, index) => (

          <div className="col-md-3">
            <div className="card">
              <Link target='__blank' to={'/detail/' + rcourse.pk}><img src={BaseUrl + 'media/' + rcourse.fields.img} className="card-img-top" alt="..." /></Link>
              <div className="card-body">
                <h5 className="card-title"><Link to={'/detail/' + rcourse.pk}>{rcourse.fields.title}</Link></h5>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  </div>
);

}
export default CourceDetail;


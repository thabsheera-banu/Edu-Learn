import React, { useEffect, useState, useRef } from 'react';
import Theader from './Theader';
import './chat.css';
import TutorSidebar from './TutorSidebar';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import BaseUrl from '../BaseUrl';

function TutorChat() {
  const [studentData, setStudentData] = useState([]);
  const loadMoreRef = useRef(null);
  const [visibleData, setVisibleData] = useState(1);
  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    try {
      axios
        .get(BaseUrl + 'course/fetch-all-entrolled-students/' + teacherId)
        .then((res) => {
          setStudentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        // When the load more element is in view, load the remaining students
        setVisibleData((prevCount) => prevCount + 1);
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* <Theader /> */}

      <div className='container mt-4'>
        <div className='row'>
          {/* <aside className='col-md-3'>
                <TutorSidebar/>
            </aside> */}
          <section className='col-md-12'>
            <MDBContainer
              fluid
              className='py-5 full-height-container'
              style={{ backgroundColor: '#eee' }}
            >
              <MDBRow>
                <MDBCol md='6' lg='5' xl='4' className='mb-4 mb-md-0'>
                  <h5 className='font-weight-bold mb-3 text-center text-lg-start'>
                    Students
                  </h5>

                  <MDBCard>
                    <MDBCardBody>
                      <MDBTypography listUnStyled className='mb-0' ref={loadMoreRef}>
                        {studentData.slice(0, visibleData).map((row, index) => (
                          <li
                            key={index}
                            className='p-2 border-bottom'
                            style={{ backgroundColor: '#eee' }}
                          >
                            <a href='#!' className='d-flex justify-content-between'>
                              <div className='d-flex flex-row'>
                                <img
                                  src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp'
                                  alt='avatar'
                                  className='rounded-circle d-flex align-self-center me-3 shadow-1-strong'
                                  width='60'
                                />
                                <div className='pt-1'>
                                  <p className='fw-bold mb-0'>{row.student.full_name}</p>
                                  <p className='small text-muted'>Hello,</p>
                                </div>
                              </div>
                              <div className='pt-1'>
                                <p className='small text-muted mb-1'>Just now</p>
                                <span className='badge bg-danger float-end'>1</span>
                              </div>
                            </a>
                          </li>
                        ))}
                      </MDBTypography>
                      {studentData.length > visibleData && (
                        <p className='text-center mt-3'>Loading more students...</p>
                      )}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol md='6' lg='7' xl='8'>
                  <MDBTypography listUnStyled>
                    <li className='d-flex justify-content-between mb-4'>
                      <img
                        src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp'
                        alt='avatar'
                        className='rounded-circle d-flex align-self-start me-3 shadow-1-strong'
                        width='60'
                      />
                      <MDBCard>
                        <MDBCardHeader className='d-flex justify-content-between p-3'>
                          <p className='fw-bold mb-0'>Brad Pitt</p>
                          <p className='text-muted small mb-0'>
                            <MDBIcon far icon='clock' /> 12 mins ago
                          </p>
                        </MDBCardHeader>
                        <MDBCardBody>
                          <p className='mb-0'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua.
                          </p>
                        </MDBCardBody>
                      </MDBCard>
                    </li>
                    <li class='d-flex justify-content-between mb-4'>
                      <MDBCard className='w-100'>
                        <MDBCardHeader className='d-flex justify-content-between p-3'>
                          <p class='fw-bold mb-0'>Lara Croft</p>
                          <p class='text-muted small mb-0'>
                            <MDBIcon far icon='clock' /> 13 mins ago
                          </p>
                        </MDBCardHeader>
                        <MDBCardBody>
                          <p className='mb-0'>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium.
                          </p>
                        </MDBCardBody>
                      </MDBCard>
                      <img
                        src='https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp'
                        alt='avatar'
                        className='rounded-circle d-flex align-self-start ms-3 shadow-1-strong'
                        width='60'
                      />
                    </li>

                    <li className='bg-white mb-3'>
                      <MDBTextArea label='Message' id='textAreaExample' rows={4} />
                    </li>
                    <MDBBtn color='info' rounded className='float-end'>
                      Send
                    </MDBBtn>
                  </MDBTypography>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TutorChat;

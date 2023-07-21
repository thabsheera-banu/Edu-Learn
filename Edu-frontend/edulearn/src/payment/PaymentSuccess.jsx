// import React, { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import './paymentSuccess.css'
// import { Navbar } from 'react-bootstrap';

// function PaymentSuccess() {

//   const state  = useLocation();
//   const [courseId, setCourse] = useState(state.state?.course_id);
//   console.log(courseId);
//   return (
//     <div style={{minHeight:'100vh'}}>
//         <Navbar/>
//          <div class=" mt-5">
//       <div className='success' >
//         <i class="checkmark">✓</i>
//       </div>
//         <h1>Success</h1> 
//         <p>We received your purchase request;<br/> we'll be in touch shortly!</p>
//         <Link to={`/`} className='btn btn-outline-success btn-lg'>Go to Course</Link>
//       </div>
//     </div>
//   )
// }

// export default PaymentSuccess
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './paymentSuccess.css';
import { Navbar } from 'react-bootstrap';

function PaymentSuccess() {
  const state = useLocation();
  const [courseId, setCourse] = useState(state.state?.course_id);
  console.log(courseId);

  return (
    <div className="payment-success-container">
      <Navbar />
      <div className="payment-card mt-5">
        {/* <div className="success-icon">
          <i className="checkmark">✓</i>
        </div> */}
        <h1>Success</h1>
        <p>We received your purchase request; we'll be in touch shortly!</p>
        <Link to={`/`} className="btn btn-outline-success btn-lg">
          Go to Course
        </Link>
      </div>
    </div>
  );
  
}

export default PaymentSuccess;

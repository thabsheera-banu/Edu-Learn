import Axios from "axios";
import React, { useContext, useState } from "react";

import { Navigate,  useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import BaseUrl from "../BaseUrl";

function Payment() {
    
    const navigate = useNavigate()
    const state  = useLocation();
    const student_id = localStorage.getItem('StudentId')
    const [courseID, setCourse] = useState(state.state?.course_id);
    const [amount, setAmount] = useState(state.state?.amount);
    const [name, setName] = useState(state.state?.name);

// this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not
  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await Axios({
        url: `${BaseUrl}course/payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          setCourse("");
          setAmount("");
          navigate('/payment/success',{ state: { course_id: courseID} })
          
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {
    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", amount);
    bodyData.append("course_id", courseID);
    bodyData.append("student_id", student_id);
    


    const data = await Axios({
      url: `${BaseUrl}course/razorpay/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
      key_id: 'rzp_test_YRIPc7w7gPnCKk', // in react your environment variable must start with REACT_APP_
      key_secret:'4jU1cEQdGjRZkZJh52BL9LUf',
      amount: data.data.payment.amount,
      currency: "INR",
      name: "EduLearn",
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  console.log(state);
  console.log(student_id);
//   return (
    
//     <div style={{minHeight:'100vh'}}>
//       <Navbar/>
//     <div className="container " style={{ marginTop: "20vh" }}>
//       <form>
//         <h1>Summary</h1>

//         <div className="form-group mt-2">
          
//           <span>Product Name:</span><span>{name}</span>
//         </div>
//         <div className="form-group mt-2" >
//         <span>Product price:</span><span>{amount}</span>

         
//         </div>
//       </form>
//       <button onClick={showRazorpay} className="btn btn-primary btn-block mt-2"  style={{width:'25%',backgroundColor:'#a435f0',border:'#a435f0'}}>
//         Pay with razorpay
//       </button>
//     </div>
//     </div>
//   );
// }
return (
  <div style={{ minHeight: "100vh" }}>
    <Navbar />
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow" style={{ width: "300px" }}>
        <form>
          <h1 className="mb-4">Summary</h1>

          <div className="form-group mt-2">
            <span className="font-weight-bold">Product Name:</span> <span>{name}</span>
          </div>
          <div className="form-group mt-2">
            <span className="font-weight-bold">Product Price:</span> <span>{amount}</span>
          </div>
          </form>

          <button
            onClick={showRazorpay}
            className="btn btn-primary btn-block mt-4"
            style={{ backgroundColor: "#a435f0", border: "#a435f0" }}
          >
            Pay with Razorpay
          </button>
      </div>
    </div>
  </div>
);
}

export default Payment;
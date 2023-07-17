import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../BaseUrl';

function MessageList(props) {
  const [msgData, setMessagedata] = useState([]);
  const [added,setAdded] =useState(false)
  useEffect(() => {
    fetchMsg()
    
  }, [added]);
  const fetchMsg = () =>{
    try {
        axios
          .get(BaseUrl + 'teacher/get-msg/' + props.teacher_id + '/' + props.student_id)
          .then((res) => {
            setMessagedata(res.data);
            if(added===false){
                setAdded(true)
            }else{
                setAdded(false)
            }
            
          });
      } catch (error) {
        console.log(error);
      }

  }
 
 
//   const msglist={
//     height :'500px',
//     overflow : 'auto'

//   }

  return (
    

    <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
    <div className='row'>
    {msgData.map((row, index) => (

      <div className=''>
        <div className='col-6'>
          <div className='row '>
              {row.msg_from !== 'teacher' && (
                <div key={index}>
                  <small className='text-muted'>{row.msg_time}</small>
                  <div className='alert alert-primary ms-4'>{row.msg_text}</div>
                </div>
              )}
        
          </div>
        </div>
        <div className='col-6 offset-4'>
          <div className='row '>
             { row.msg_from === 'teacher' && (
                <div key={index}>
          
            <small className='ms-5 text-muted'>{row.msg_time}</small>
            <div className='alert alert-danger ms-4'>
              <p>{row.msg_text}</p>
            </div>
            </div>
              )}
            
          </div>
          
        </div>
      </div>
          ))}
    </div>
  </div>
  );
}

export default MessageList;

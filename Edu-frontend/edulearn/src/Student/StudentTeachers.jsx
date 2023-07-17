import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';


import axios from 'axios';
import BaseUrl from '../BaseUrl';
import { IconButton } from '@material-ui/core';
import CommentIcon from '@mui/icons-material/Comment';
import StudentSidebar from './StudentSidebar';
import MessageList from './MessageList';

function StudentTeachers() {
  const [teacherData,setteacherData] = useState([])
  const [studentData, setStudentData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [msgList,setmessageList] = useState({
    msg_text : '',
  })
  const [successMsg,setsuccessMsg] = useState('')
  const [errorMsg,setErrorMsg] = useState('')
  const teacherId = localStorage.getItem('teacherId');
  const StudentId = localStorage.getItem('StudentId')

  useEffect(() => {
    try {
      axios.get(BaseUrl + 'course/fetch-my-teachers/' + StudentId)
      .then((res) => {
        setteacherData(res.data);
      });
    } catch (error) {
      console.log(Error);
    }
  }, []);

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setModalOpen(false);
  };

  const handleSendMessage = (event) => {
    setmessageList({
      ...msgList,
      [event.target.name] : event.target.value

    })
    
  };

  const formSumbit = (teacher_id) =>{
    const formData = new FormData();
    formData.append('msg_text',msgList.msg_text)
    formData.append('msg_from','student')
    try{
      axios.post(BaseUrl+'teacher/send-msg/'+teacher_id+"/"+StudentId,formData)
      .then((res)=>{
        if(res.data.bool === true){
          setmessageList({
            'msg_text' : ''
          });
          setsuccessMsg(res.data.msg)
          setErrorMsg('')
        }
        else{
          setsuccessMsg('')
          setErrorMsg(res.data.msg)
        }
      })
 
    }catch(error){
      console.log(error);

    }


  }

  return (
    <div style={{ minHeight: '100vh' }}>

      <div className='container mt-4'>
        <div className='row'>
          <aside className='col-md-3'>
            <StudentSidebar />
          </aside>

          <div className='col-md-9'>
            <TableContainer component={Paper}>
              
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'lightblue' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Teachers</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teacherData.map((stu, index) => (
                    <TableRow key={index} sx={{ backgroundColor: '' }}>
                      <TableCell >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={stu.teacher.profile_img} alt="Teacher Image" width="50" className="rounded" style={{ marginRight: '10px' }} />
                            <span>{stu.teacher.full_name}</span>
                        </div>
                      </TableCell>                     
                       <TableCell >
                        <IconButton color='primary' onClick={() => handleOpenModal(stu)}>
                          <CommentIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
 

       <Modal open={modalOpen} onClose={handleCloseModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'white', boxShadow: 24, p: 4 }}>
          <Typography variant='h6' gutterBottom className='ms-5 text-center'>
            Message
          </Typography>
          {selectedStudent && (
            
            <div> 


{/* jsx */}
              <Typography className='mb-3 ms-5' variant='body1'>Send Message to {selectedStudent.teacher.full_name}</Typography>
              {/* Chat interface */}

              <div className='modal-body'  style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <MessageList teacher_id={selectedStudent.teacher.id} student_id = {StudentId}/>
                

              </div>
             <List >
                {chatMessages.map((message, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText align={message.sender === 'me' ? 'right' : 'left'} primary={message.text} />
                    </ListItem>
                    <Divider variant='middle' component='li' />
                  </React.Fragment>
                ))}
              </List> 
              {/* Message input */}
              {successMsg && <p className='text-success ms-3'>{successMsg}</p>}
              {errorMsg && <p className='text-danger ms-3 '>{errorMsg}</p>}
               <TextField 
               onChange={handleSendMessage}
               name ='msg_text'
               value={msgList.msg_text}
              
                style={{width: 350}}
                className='ms-3'
                variant='outlined'
                margin='normal'
                fullWidth
                label='Type your message...'
                autoFocus
                // Add an event handler for the input value
              /> 
              {/* Send button */}
               <Button variant='contained' color='primary' onClick={()=>formSumbit(selectedStudent.teacher.id)}>
                Send
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default StudentTeachers;

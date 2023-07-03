import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TeacherProfile from './TeacherProfile';


function TutorSidebar() {
  return (
    <div className="card bg-light">
      <div className="card-body">
        {/* <h5 className="card-title">Tutor Sidebar</h5> */}
        <div className="list-group list-group-flush">
          <Link to="/tutor/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
          <Link to="/tutor/course" className="list-group-item list-group-item-action">My Courses</Link>
          <Link to="/tutor/addcourse" className="list-group-item list-group-item-action">Add Course</Link>
          <Link to="/teacher/mystudent" className="list-group-item list-group-item-action">My Students</Link>
          <Link to="/tutor/profile" className="list-group-item list-group-item-action">  <AccountCircleIcon /> Profile</Link>

          <p className="list-group-item list-group-item-action text-danger btn">Log Out</p>
        </div>
      </div>
    </div>
  );
}

export default TutorSidebar;

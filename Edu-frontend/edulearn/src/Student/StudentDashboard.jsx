import React, { useEffect, useState } from 'react'

import StudentSidebar from './StudentSidebar';
import Theader from '../Tutor/Theader';


function StudentDashboard() {
  
  
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* <Theader /> */}

      <div className='container mt-4'>
        <div className='row'>
          <aside className='col-md-3'>
            <StudentSidebar />
          </aside>

          <div className='col-md-9' style={{backgroundColor :'rgb(28, 48, 92)' }}>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;

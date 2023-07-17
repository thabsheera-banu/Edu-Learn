import React, { useEffect, useState } from 'react'

import StudentSidebar from './StudentSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../BaseUrl';


function StudentDashboard() {
    const [dashboardData,setDashboardData] = useState([])
    const StudentId = localStorage.getItem('StudentId')
    useEffect(() =>{
        try{
            axios.get(BaseUrl+"user/std-dashboard/" +StudentId)
            .then((res) =>{
                setDashboardData(res.data)
            })

        }
        catch(error){
            console.log(error);
        }
    

    },[])

  
  
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* <Theader /> */}

      <div className='container mt-4'>
        <div className='row'>
          <aside className='col-md-3'>
            <StudentSidebar />
          </aside>

          <div className='col-md-9' >
          <div className="row mt-5">

                       
<div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Entrolled Course </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800 "><Link to="/student-myCource">{dashboardData.entrolled_courses}</Link></div>
                </div>
                
            </div>
        </div>
    </div>
</div>


<div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-success shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Favourite Courses </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">433</div>
                </div>
                
            </div>
        </div>
    </div>
</div>



<div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-info shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total Courses
                    </div>
                    
                    <div class="row no-gutters align-items-center">
                        
                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800"><Link to='/teacher/courses'>433</Link></div>
                        
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>


<div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-warning shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Total Students</div>
                        
                    <div class="h5 mb-0 font-weight-bold text-gray-800"><Link to='/teacher/mystudent'>4322</Link></div>
                </div>
               
            </div>
        </div>
    </div>
</div>
</div>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;

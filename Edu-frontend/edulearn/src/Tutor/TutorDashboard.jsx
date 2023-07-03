import React from 'react'
import TutorSidebar from './TutorSidebar'
import Theader from './Theader'
// import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom'


function TutorDashboard() {
  return (
    <div style={{minHeight:'100vh'}}>
      <Theader/>
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                <TutorSidebar/>

                </aside>
                <section className='col-md-9'>
                
                    <div class="row">

                       
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Earnings </div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">400</div>
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
                                                Admin Earnings </div>
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

                    {/* <!-- Content Row --> */}

<div class="row">

    {/* <!-- Area Chart --> */}
    <div class="col-xl-12 col-lg-7">
        <div class="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div
                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                
            </div>
            {/* <!-- Card Body --> */}
            <div class="card-body">
           


            {/* <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div> */}


            </div>
        </div>
    </div>

    {/* <!-- Pie Chart --> */}
    
</div>

                </section>

        </div>
    </div>

    </div>
  )
}

export default TutorDashboard

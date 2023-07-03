import React from 'react'
import AdminSidebar from './AdminSidebar'

function AddTutors() {
  return (
    <div>
        <thead/>
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
              <AdminSidebar/>

                </aside>
                <section className='col-md-9'>
                <table class="table">
                    <thead>
                    
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th>Courses Enrolled</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                  
                    
                            <tr >
                            <th scope="row">1</th>
                            <td>banu</td>
                            <td>email</td>
                            <td></td>
                            <td> <p className="card btn btn-info disabled text-dark">Active</p>:<p className="card btn btn-warning disabled text-dark">InActive</p></td>
                            <td><p  className="text-decoration-none" >
                                                 
                                                        <p  className='card btn btn-warning text-dark text-decoration-none'>Block</p>
                                                        
                                                        <p className='card btn btn-info text-dark text-decoration-none'>UnBlock</p>
                                                  
                                                    
                                                </p></td>
                            </tr>
                    
             
                       
                        
                    </tbody>
                    </table>
                
                </section>

            </div>
        </div>
        
    </div>
  )
}

export default AddTutors

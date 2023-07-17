import React from 'react'
import { Link } from 'react-router-dom'

function AdminHeader() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className='container'>
<Link className="navbar-brand " to="/">EduLearn</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarNavAltMarkup">

<div className="navbar-nav ms-auto">
  <button className="btn btn-secondary" >LogOut</button>
</div>

   
</div>
</div>

</nav>

</div>
  )
}

export default AdminHeader

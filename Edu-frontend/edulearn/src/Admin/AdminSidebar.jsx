import React from 'react'
import {Link} from 'react-router-dom'

function AdminSidebar() {
  return (
    <div className="card bg-light">
    <div className="card-body">
      <div className="list-group list-group-flush">
      <Link to="/" className="list-group-item list-group-item-action">Home</Link>
        <Link to="/admin/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
        <Link to="/admin/users" className="list-group-item list-group-item-action">Users</Link>
        <Link to="/admin/tutors" className="list-group-item list-group-item-action">Tutors</Link>
        <Link to="/admin/Categorylist/" className="list-group-item list-group-item-action">Category</Link>
        <p className="list-group-item list-group-item-action text-danger btn">Log Out</p>
      </div>
    </div>
  </div>
  )
}

export default AdminSidebar

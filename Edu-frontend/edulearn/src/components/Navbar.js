import { Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StudentLogout from "../Student/StudentLogout";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container">
          <Link className="navbar-brand " to="/">EduLearn</Link>
          <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon text-light"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active " aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/all-cources">Course</Link>
              </li>
            
              <li className="nav-item">
                <Link className="nav-link " to="/student-login">User</Link>
                
              </li>
              <li><StudentLogout/></li>
            
              <li className="nav-item">
                <Link className="nav-link " to="/teacher-login">Tutor</Link>
              </li>
              
              
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  
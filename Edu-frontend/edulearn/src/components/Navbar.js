import { Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StudentLogout from "../Student/StudentLogout";
import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import './navbar.css'

function Navbar(props) {
  const loginstatus = localStorage.getItem('studentLoginstatus')
  const teacherloginStatus = localStorage.getItem('teacherloginStatus')
  const name = localStorage.getItem('name')
  const teacher = localStorage.getItem('teacher')
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTextField, setShowTextField] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [searchString, setSearchString] = useState({
    'search': ''
  }
  )

  const handleSearchClick = () => {
    if (searchString.search.trim() !== '') {
      window.location.href = '/search/' + searchString.search;
    }


    setShowTextField(!showTextField);
  };

  const handlechange = (event) => {
    setSearchString({
      ...searchString,
      [event.target.name]: event.target.value

    })
  };
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 100);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  

  return (
    // <nav id="navbar" className={`navbar navbar-expand-lg  bg-transparent ${props.home ? "fixed-top" : "shadow"} `} style={{ height: "80px" }}>
<nav
      id="navbar"
      className={`navbar navbar-expand-lg ${
        isScrolled ? "bg-white" : "bg-transparent"
      } ${props.home ? "fixed-top" : "shadow"}`}
      style={{ height: "80px" }}
    >
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark   "> */}
      <div className="container">
        <Link className="navbar-brand " to="/">EduLearn</Link>
        <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon text-light"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link  " aria-current="page" >Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/category"> All Category</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/all-cources">Course</Link>
            </li>





            {!loginstatus && !teacherloginStatus ? (
  <li className="nav-item">
    {loginstatus === 'true' ? (
      <Link className="nav-link" to="/student-dsb">Student dashboard</Link>
    ) : (
      <Link className="nav-link" to="/student-login">Login</Link>
    )}
  </li>
) : teacherloginStatus && !loginstatus ? (
  <li className="nav-item dropdown">
    {teacherloginStatus === 'true' ? (
      <Link className="nav-link" to="/tutor/dashboard">{teacher}</Link>
    ) : (
      <Link className="nav-link" to="/teacher-login">Login</Link>
    )}
  </li>
) : (
  <li className="nav-item">
    {loginstatus === 'true' ? (
      <Link className="nav-link" to="/student-dsb">{name}</Link>
    ) : (
      <Link className="nav-link" to="/student-login">Login</Link>
    )}
  </li>
)}








            <form className="d-flex">
              {showTextField && (
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Type something..."
                  aria-label="Search"
                  name='search'
                  onChange={handlechange}
                />
              )}
              <IconButton
                className="ms-3"
                onClick={handleSearchClick}
                size="small"
                style={{ color: 'black' }}
              >
                <SearchIcon />
              </IconButton>
            </form>




          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


import { Link } from 'react-router-dom'

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TutorLogout from './TutorLogout';
import { useContext, useEffect } from 'react';
import AuthContext from '../Context/AuthContext';

function  Theader() {
  
  
  // useEffect(() => {
  //   setTimeout(() => {

  //   }, 500)
  // })
  const {user ,logout} = useContext(AuthContext)
  console.log("theader, ", user)
  const handleLogout = () => {
    logout();
  };
  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className='container'>
  <Link className="navbar-brand " to="/">EduLearn</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
  { user?.access_token ?
  // <TutorLogout/>
  <div className="navbar-nav ms-auto">
                <span className="nav-item nav-link">{user.email}</span>
                <button onClick={handleLogout} className='float-end ' style={{ color: '#ffffff' }}>
                  <TutorLogout/>
                </button>
              </div>


 :  
    <div className="navbar-nav ms-auto">
      
      
      <Link className="nav-item nav-link" to='/teacher-login'>Login</Link>
     <Link className="nav-item nav-link" to='/teacher/register'>Sign Up</Link>
     <Link className="nav-item nav-link" to='/user-login'>Move To Student<ArrowRightIcon/></Link>
  
    </div> 
    }  
  </div>
  </div>
  
</nav>
<div className='my-1 
'>
    {/* <h6 className='text-dark fst-italic h1'>Teacher Panel</h6> */}
  </div>
 </div>
    
  )
}

export default Theader
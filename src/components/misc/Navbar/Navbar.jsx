import React from "react";
import { useAuthContext } from '../../../contexts/AuthContext';
import { Link, NavLink } from 'react-router-dom';
import '../../../styles/partials/components/Navbar.scss'
import '../../../styles/partials/components/Card.scss'

function Navbar(){
  const { user } = useAuthContext();

  return(
    <nav className= "Navbar navbar navbar-expand-lg main-nav">
    <div className="container">
      <Link className="navbar-brand" to="/">CarBuddy</Link> 
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="main-nav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <NavLink to="/" className="navbar__li">Home</NavLink>
        </li>
        {
          user ?
          <>
            <li className="nav-item">
              <NavLink to="/journeys" className="navbar__li">Journeys</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className="navbar__li">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/journeys/create" className="navbar__li">New Journeys</NavLink>
            </li>
          </>
          :
          <>
            <li className="nav-item">
              <NavLink to="/register" className="navbar__li">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="navbar__li">Login</NavLink>
            </li>
          </>
        }    
          {/* <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
          </li> */}
        </ul>
      </div>
      { user &&
        <div className="ml-auto mr-1">
          <NavLink to="/profile" className="img-user">
            <img className="img-user" src={user.image} alt="me"/>
          </NavLink>
        </div>
      }
    </div>
  </nav>
  )
}

export default Navbar
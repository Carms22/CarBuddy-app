import React from "react";
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss'

function Navbar(){
  return(
    <nav className={` Navbar navbar navbar-expand-lg main-nav`}>
    <div className="container">
      <Link className="navbar-brand" to="/">CarBuddy</Link> {/* Este Link viene de react-router-dom y nos permite navegar entre las distintas rutas con la prop to="ruta" EX. to="/users" */}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="main-nav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/journeys" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Journeys</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink to="/users" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Users</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/users/create" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Create Users</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Signup</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
import React from "react";
import { Link, NavLink } from 'react-router-dom';

function Card(){

  return(
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
      </div>
    </div>
  )

}

export default Card;
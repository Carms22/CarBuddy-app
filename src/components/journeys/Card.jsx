import React from "react";
import {  NavLink } from 'react-router-dom';

function Card({origin, destination, price, departureTime, creator, date}){

  return(
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{origin}</h5>
        <h5 className="card-title">{destination}</h5>
        <p className="card-text">{price}</p>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
      </div>
    </div>
  )
}

export default Card;
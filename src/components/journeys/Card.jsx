import React from "react";
import {  NavLink } from 'react-router-dom';

function Card({origin, destination, price, departureTime, creator, date}){

  return(
    <div className="card">
      <div className="card-body row">
        <div className="col">
          <h5 className="card-title"><strong>{origin.street}</strong></h5>
          <h5 className="card-title"><strong>{destination.street}</strong></h5>
        </div>
        <div className="col">
          <p className="card-text">{price} €</p>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Card;
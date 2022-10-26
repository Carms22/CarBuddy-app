import React from "react";
import {  Link, NavLink } from 'react-router-dom';
import moment from 'moment'; 

function Card({origin, destination, price, departureTime, creator, date,id}){
 
  return(
    <div className="card">
      <div className="card-body row">
        <div className="col">
          <h5 className="card-title"><strong>{origin.street}</strong></h5>
          <h5 className="card-title"><strong>{destination.street}</strong></h5>
        </div>
        <div className="col">
          <h4><strong>{moment(date).format('MM/DD/YYYY')}</strong></h4>
          <p className="card-text">{price} €</p>
        </div>
      </div>
      <Link key={id} className="" to={`/journeys/${id}`}>Go to detail</Link>
    </div>
  )
}
export default Card;
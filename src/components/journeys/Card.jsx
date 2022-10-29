import React from "react";
import {  Link } from 'react-router-dom';
import moment from 'moment'; 
import './Card.scss'

function Card({origin, destination, price, departureTime, creator, date,id, vehicle}){
 
  return(
    <Link key={id} className="Card" to={`/journeys/${id}`} >
      <div className="card">
        <div className="card-body row">
          <div className="col-6">
            <h6 className="card-title"><strong>From: {origin.street}</strong></h6>
            <h6 className="card-title"><strong>To: {destination.street}</strong></h6>
          </div>
          <div className="col-6">
            <h6><strong>Date: {moment(date).format('MM/DD/YYYY')} - Departure time: {departureTime}</strong></h6>
            <p className="card-text">Price: {price} € <strong>Seats left: {vehicle.seats}</strong></p>
            <p className="card-text">Driver: {creator.name} {creator.image}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default Card;
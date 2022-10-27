import React from "react";
import { Link } from 'react-router-dom';
import moment from 'moment'; 

function BookingCard({booking}){
 
  return(
    <div className="card">
    <div>
      {booking.journey}
    </div>
      {/* <div className="card-body row">
        <div className="col-6">
          <h6 className="card-title"><strong>From: {booking.journey.origin.street}</strong></h6>
          <h6 className="card-title"><strong>To: {booking.journey.destination.street}</strong></h6>
        </div>
        <div className="col-6">
          <h6><strong>Date: {moment(booking.journey.date).format('MM/DD/YYYY')} - Departure time: {booking.journey.departureTime}</strong></h6>
          <p className="card-text">Price: {booking.journey.price} € <strong>Seats left: {booking.journey.vehicle.seats}</strong></p>
        </div>
      </div>
      <Link key={booking.id} className="" to={`/journeys/${booking.id}`}>Go to detail</Link> */}
    </div>
  )
}
export default BookingCard;
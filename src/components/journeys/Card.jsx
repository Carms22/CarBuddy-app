import React, { useState } from "react";
import {  Link } from 'react-router-dom';
import moment from 'moment'; 
import './Card.scss'

function Card({origin, destination, price, departureTime, creator, date,id, vehicle, score}){
  const [totalPoints, setTotalPoints] = useState()
  console.log("en Card fuera de todo ", score[0]);
  function calculateTotal(score) {
    console.log("score", score);
    if(score){
      score.map(element => {
        console.log("element on map", element);
        setTotalPoints(totalPoints + element.points)
      })

    }
  }
  return(
    <Link key={id} className="m-1" to={`/journeys/${id}`} >
      <div className="card">
        <div className="card-body row">
          <div className="col-6">
            <h6 className="card-title"><strong>From: {origin.street}</strong></h6>
            <h6 className="card-title"><strong>To: {destination.street}</strong></h6>
            { score &&  <h6 className="card-title" key={score.id}><strong>Rating: {calculateTotal()}</strong></h6> }
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
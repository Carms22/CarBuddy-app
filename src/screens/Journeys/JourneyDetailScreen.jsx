import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { getJourneyDetail } from "../../services/JourneyService";


function JourneyDetailScreen() {
  const [journey, setJourney] = useState();
  const {id}= useParams()

  useEffect(() =>{

      getJourneyDetail(id)
        .then( journey => {
          setJourney(journey)
          console.log(journey.date.toDateString());
        })
        .catch(err => console.log(err))
    
  },[id])

  return (

    <div className="container">
      Detail
      { !journey ? "Loaiding" 
        :
        <div className="row">
          <div>
            <h1><strong>{journey.date}</strong></h1>
            <h3><strong><span>{journey.departureTime}</span><span>{journey.origin.street}</span></strong></h3>
            <h3><strong><span>{journey.returnTime}</span><span>{journey.destination.street}</span></strong></h3>
            <h2>Price: {journey.price}€ - seats left: {journey.vehicle.seats}</h2>
          </div> 
        </div>
      }
    </div> 
    
  );
}

export default JourneyDetailScreen;
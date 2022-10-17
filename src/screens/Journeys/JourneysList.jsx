import { useState, useEffect } from "react";
import Card from "../../components/journeys/Card";
import {getJourneys} from '../../services/JourneyService'

function JourneysList (){
  const [journeys, setJourneys] = useState([])

  useEffect( ()=> {
    getJourneys()
      .then( journeys => {
        console.log(journeys);
        setJourneys(journeys)
      })
  },[])

  return(
    <div>
      <h1>Journeys List</h1>
        {journeys.map( journey => (
          <Card {...journey} key={journey.id}/>
        ))}
    </div>
  )
}



export default JourneysList;
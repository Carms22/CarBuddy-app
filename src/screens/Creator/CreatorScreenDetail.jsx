import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/journeys/Card";
import { getListByCreator } from "../../services/JourneyService";
import { getCreator } from "../../services/UserService";

function CreatorScreenDetail() {
  const {id}= useParams();
  const [creator, setCreator] = useState()
  const [journeysByCreator, setJourneys] = useState()

  useEffect(() => {
    getCreator(id)
      .then( creator => {
        console.log("creator en useEff", creator);
        setCreator(creator)
      })
  },[id])
  
  useEffect(() => {
    getListByCreator(id)
      .then( journeys => {
        console.log("journeys en useEff", journeys);
        setJourneys(journeys)
      })
  },[id])
  
  return ( 
    <div>
      { creator &&
        <h4>Name: {creator.name}<img src={creator.image} alt="creator-img"/></h4>
      }
      { journeysByCreator ? journeysByCreator.map( journey => 
        <Card {...journey} key={journey.id} />
      )
      :
      <p>There is no journeys</p>

      }
    </div>
   );
}

export default CreatorScreenDetail;
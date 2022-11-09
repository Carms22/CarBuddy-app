import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/journeys/Card";
import Rating from "../../components/journeys/Rating";
import { calculateUserScore } from "../../helper/scoreHelper";
import { getListByCreator } from "../../services/JourneyService";
import { getCreator } from "../../services/UserService";
import "../../styles/partials/screens/UserDetailScreen.scss";

function CreatorScreenDetail() {
  const {id}= useParams();
  const [creator, setCreator] = useState();
  const [journeysByCreator, setJourneys] = useState();
  const [rating, setRating] = useState();

  
  useEffect(() => {
    getCreator(id)
      .then( creator => {
        setCreator(creator)
        setRating(calculateUserScore(creator.score))
      })
  },[id])
  
  useEffect(() => {
    getListByCreator(id)
      .then( journeys => {
        setJourneys(journeys)
      })
  },[id])
  
  console.log("journeyByCreator", journeysByCreator);
  return ( 
    <div className="User-screen container">
      { creator &&
        <div className="container">
          <h2>Name: {creator.name}<img className='img-user' src={creator.image} alt="creator-img"/></h2>
          <Rating className="text-center">{rating}</Rating>
          <h3 className="h-grey">Journeys of {creator.name}:</h3>
        </div>
      }
      
      { journeysByCreator ? journeysByCreator.map( journey => 
        <div className='link-card'>
          <Card  {...journey} key={journey.id} />
        </div>
      )
      :
      <p>There is no journeys</p>
      }
    </div>
   );
}

export default CreatorScreenDetail;
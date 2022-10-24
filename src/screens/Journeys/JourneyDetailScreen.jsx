import React, { useContext, useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { getJourneyDetail, postComment } from "../../services/JourneyService";
import AuthContext from "../../contexts/AuthContext"

function JourneyDetailScreen() {
  const [journey, setJourney] = useState();
  const [comment, setComment] = useState({content: ""});
  const {id}= useParams();
  const { user } = useContext(AuthContext);

  const onSubmit = (event) => {
    event.preventDefault()
    if(comment){
      postComment(id,comment)
        .then(journey => {
          setComment({content: ""})
        })
    } else{
      <div>You must write a comment</div>
    }
  }

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    setComment( {...comment, [name]: value})
  }

  useEffect(() =>{
    getJourneyDetail(id)
      .then( journey => {
        setJourney(journey)
        console.log(journey.date);
      })
      .catch(err => console.log(err))
  },[id,comment])

 

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
          <div>
            { journey.comments? journey.comments.map( (comment) => 
              <div  className="container" key={comment.id}>
                <h3>{comment.commentCreator.name}</h3>
                <p>{comment.content}</p>
              </div> 
              )
              :
              "Loading..."
            }
          </div>
        </div>
      }
     
      <div className="container">
      { user &&
       <div className="mb-4">
          <h3 className="comment">Add a comment</h3>
          <form onSubmit={onSubmit}>
            <div className="comment-form">
              <textarea className="" 
                onChange={handleOnChange} 
                name="content"
                value={comment.content} 
                id="comment" maxLength ="100"></textarea>
              <button type="submit" className="btn btn-dark mt-3 comment-btn ">Submit</button>
            </div>
          </form>
        </div>
      }
     </div>
    </div> 

  );
}

export default JourneyDetailScreen;
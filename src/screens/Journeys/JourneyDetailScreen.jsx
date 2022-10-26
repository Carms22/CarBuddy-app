import React, { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { getJourneyDetail, postComment } from "../../services/JourneyService";
import AuthContext from "../../contexts/AuthContext"
import { postBooking } from "../../services/BookingService";

function JourneyDetailScreen() {
  const {id}= useParams();
  const { user } = useContext(AuthContext);
  const [journey, setJourney] = useState();
  const [comment, setComment] = useState({content: ""});
  const navigate = useNavigate()


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
      .then( comment => comment)
  }

  const handleOnclick =() =>{
    postBooking(id)  
    navigate("/profile")      
  }


  useEffect(() =>{
    getJourneyDetail(id)
      .then( journey => {
        setJourney(journey)
      })
      .catch(err => console.log(err))
  },[id,comment])

  return (
    <div className="container">
      Detail
      { !journey ? "Loaiding" 
        :
        <div className="row">
          <div className="col-4">
            <h1><strong>{journey.date}</strong></h1>
            <h3><strong><span>{journey.departureTime}</span><span>{journey.origin.street}</span></strong></h3>
            <h3><strong><span>{journey.returnTime}</span><span>{journey.destination.street}</span></strong></h3>
          </div> 
          <div className="col-4">
            <h1><strong>{journey.vehicle.typeOf}</strong></h1>
          </div> 
          <div className="col-4">
            <h2>Price: {journey.price}€ - seats left: {journey.vehicle.seats}</h2>
            <button className="btn btn-dark" onClick={handleOnclick}>Reserve it</button>
          </div>
          <div className="container">
            <div className="row">
              { journey.comments? journey.comments.map( (comment) => 
                <div  className="col-4" key={comment.id}>
                  <h3>{comment.commentCreator.name}</h3>
                  <p>{comment.content}</p>
                </div> 
                )
                :
                "Loading..."
              }
            </div>
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
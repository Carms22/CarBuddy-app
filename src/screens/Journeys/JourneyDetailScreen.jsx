import React, { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import moment from 'moment'; 
import { getJourneyDetail, postComment, postScore } from "../../services/JourneyService";
import AuthContext from "../../contexts/AuthContext"
import { postBooking } from "../../services/BookingService";

function JourneyDetailScreen() {
  const {id}= useParams();
  const { user } = useContext(AuthContext);
  const [journey, setJourney] = useState();
  const [comment, setComment] = useState({content: ""});
  const [score, setScore] = useState();
  const navigate = useNavigate();

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
      .then(booking => booking)  
    navigate("/profile")      
  }
  
  const handleOnChangeScore = (event) => {
    const { value } = event.target;
    setScore(value)
  }

  console.log(" clg fuera de todo imp body",score);

  const onSubmitScore = (event) => {
    event.preventDefault()
    console.log('score', score);
      postScore(id, {points: score})
        .then(score => {
          console.log('onSubmit' , score);
        })
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
          <div className="col-6">
            <h2><strong>{moment(journey.date).format('MM/DD/YYYY')}</strong></h2>
            <h4><strong><span>Hour: {journey.departureTime}</span><span>{journey.origin.street}</span></strong></h4>
            <h4><strong><span>Return hour:{journey.returnTime}</span><span>{journey.destination.street}</span></strong></h4>
          </div> 
    
          <div className="col-6">
            <h3><strong>{journey.vehicle.typeOf}</strong></h3>
            <h3>Price: {journey.price}€ - seats left: {journey.vehicle.seats}</h3>

            <button className="btn btn-dark" onClick={handleOnclick} disabled={ journey.vehicle.seats < 1} >Reserve it</button>
            
          </div>
          <div className="container">
            <div className="row">
              { journey.comments? journey.comments.map( (comment) => 
                <div  className="col-4" key={comment.id}>
                  <h4>{comment.commentCreator.name}</h4>
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
     
      <div className="container row">
      { user &&
       <div className="mb-4 col-6">
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
      { user ? //user === booking.user // mejor en otro sitio??
          <div className="col-6">
            <form className="container row" onSubmit={onSubmitScore}>
              <label className="">Evaluate the journey</label>
              <select    
                type="number"
                name="points" id="points"
                value={score} onChange={handleOnChangeScore}
                placeholder="Points for the journey"
                required
              >
                <option value={0} disabled>From 1 to 5</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button type="submit">Submit</button>
            </form>
          </div>
          :
          <div></div>
        }
     </div>
    </div> 

  );
}

export default JourneyDetailScreen;
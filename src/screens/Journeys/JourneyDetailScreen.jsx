import React, { useCallback, useContext, useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from "react-router-dom";
import moment from 'moment'; 
import { getJourneyDetail, getScore, postComment, postScore } from "../../services/JourneyService";
import AuthContext from "../../contexts/AuthContext"
import { getBookingsJourney, postBooking } from "../../services/BookingService";

function JourneyDetailScreen() {
  const {id}= useParams();
  const { user } = useContext(AuthContext);
  const [journey, setJourney] = useState();
  const [comment, setComment] = useState({content: ""});
  const [score, setScore] = useState();
  const [bookings, setBooking] =  useState([])
  const [points, setPoints] = useState()
  const navigate = useNavigate();

  console.log(bookings);

  //Comments submit
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

  //Booking and score booking
  const handleOnclick =() =>{
    postBooking(id)
      .then(booking => navigate("/profile") )  
  }
  const handleOnChangeScore = (event) => {
    const { value } = event.target;
    setScore(value)
  }
  const onSubmitScore = (event) => {
    const bookingId = event.target[0].value;
    event.preventDefault()
      
    postScore(bookingId, {points: score})
        .then(score => {
          console.log('onSubmit' , score);
          getBookings()
          getScoreFunction()
        })
  }


  //Journey details
  useEffect(() =>{
    getJourneyDetail(id)
      .then( journey => {
        setJourney(journey)
      })
      .catch(err => console.log(err))
  },[id,comment])

  //bookings of the journey
  const getBookings = useCallback(() => {
    getBookingsJourney(id)
      .then(bookings => {
        setBooking(bookings)
      })
      .catch(err => console.log(err))
  }, [id])

  const getScoreFunction = useCallback(() => {
    getScore(id)
      .then(points => setPoints(points))
      .catch(err => console.log(err))
  }, [id])

  useEffect(() =>{
    getBookings()
    getScoreFunction()
  }, [getBookings, getScoreFunction])

  console.log(points);
    
  return (
    <div className="container">
      Detail
      { !journey ? "Loaiding" 
        :
        <div className="row">
          <div className="col-4">
            <h2><strong>{moment(journey.date).format('MM/DD/YYYY')}</strong></h2>
            <h4><strong><span>Departure time: {journey.departureTime} / </span><span> From: {journey.origin.street}</span></strong></h4>
            <h4><strong><span>Return hour:{journey.returnTime} / </span><span> To: {journey.destination.street}</span></strong></h4>
          </div> 
    
          <div className="col-4">
            <h3><strong>{journey.vehicle.typeOf}</strong></h3>
            <h3>Price: {journey.price}€ - seats left: {journey.vehicle.seats}</h3>
            <h3>Rating: {points}</h3>

            <button className="btn btn-dark" onClick={handleOnclick} disabled={ journey.vehicle.seats < 1} >Reserve it</button> 
          </div>
          <div  className="col-4">
            <h6>Buddy: {journey.creator.name}</h6>
            <h6>Buddy: {journey.creator.image}</h6>
            <Link to={`/creators/${id}`}>Detail</Link>
          </div>
 
          <div className="container">
            <div className="row">
              { journey.comments ? journey.comments.map( (comment) => 
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
      
      {/* Comment create*/}
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

      {/* Form to score journey */}
      { bookings.map(booking => 
        user.id===booking.user.id && !booking.isValidated ? 
          <div className="col-6" key={booking.id}>
            <form className="container row" onSubmit={onSubmitScore}>
              <input type="hidden" name="bookingId" value={booking.id}/>
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
      )

      }
     
     </div>
    </div> 

  );
}

export default JourneyDetailScreen;
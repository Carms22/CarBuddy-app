import React, { useCallback, useContext, useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from "react-router-dom";
import moment from 'moment'; 
import { getJourneyDetail, postComment, postScore } from "../../services/JourneyService";
import AuthContext from "../../contexts/AuthContext";
import { getBookingsJourney, postBooking } from "../../services/BookingService";
import { calculateUserScore } from "../../helper/scoreHelper";
import { parsePrice } from "../../helper/priceHelper";
import Rating from "../../components/journeys/Rating";
import '../../styles/partials/screens/JourneyDetailScreen.scss';

function JourneyDetailScreen() {
  const {id}= useParams();
  const { user } = useContext(AuthContext);
  const [journey, setJourney] = useState();
  const [comment, setComment] = useState({content: ""});
  const [score, setScore] = useState();
  const [bookings, setBooking] =  useState([])
  const navigate = useNavigate();

  //Comments submit
  const onSubmit = (event) => {
    event.preventDefault()
    if(comment){
      postComment(id,comment)
        .then(journey => {
          setComment({content: ""})
          getDetails()
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
          getBookingsById()
          getDetails()
        })
  }

   //bookings of the journey
  const getBookingsById = useCallback(() => {
    getBookingsJourney(id)
      .then(bookings => {
        setBooking(bookings)
      })
      .catch(err => console.log(err))
  }, [id])

  //Journey details
  const getDetails = useCallback(() => {
    getJourneyDetail(id)
    .then( journey => {
      setJourney(journey)
    })
    .catch(err => console.log(err))
  },[id])

  useEffect(() =>{
    getBookingsById()
    getDetails()
  }, [getBookingsById, getDetails])
  

  return (
    <div className="container DetailScreen">
      
      { !journey ? "Loaiding" 
      :
      <>
      <div className="container">
        <div className="start-div">
          <div className="container last">
            <h3 className="light"><strong>{moment(journey.date).format('dddd, LL')}</strong></h3>
            <div className="card-detail">
              <h5>From: <strong> {journey.origin.street}</strong></h5>
              <h5>Departure time:<strong>{journey.departureTime}</strong></h5>
            </div>
            <div className="card-detail">
              <h5>To: <strong> {journey.destination.street}</strong></h5>
              <h5>Return hour: <strong>{journey.returnTime}</strong></h5>
            </div>
          
            <div className="card-detail">
              <div className="row">
                <h5 className="col-6">Vehicle: <strong>{journey.vehicle.typeOf}</strong></h5>
                <h5 className="col-6">Price: <strong>{parsePrice(journey.price)} </strong> - seats left: <strong>{journey.vehicle.seats}</strong></h5>
                { journey.score?
                  
                <Rating className="col-4">{calculateUserScore(journey.score)}</Rating>
                : 
                <h6>No Rating</h6>
                }
              </div>
            </div>
            <button className="button text-center" onClick={handleOnclick} disabled={ journey.vehicle.seats < 1} >Reserve it</button> 

            <div className="last">
              <h4 className="light"><strong>Driver:</strong></h4>
              <div className="row driver card-detail">
                <div className="col-8 start">
                  <h5>Driver: <strong>{journey.creator.name}</strong></h5>
                  <Rating>{calculateUserScore(journey.creator.score)}</Rating>
                </div>
                <img className="img-buddy" src={journey.creator.image} alt="Buddy"/>
              </div>
              <Link className="button" to={`/creators/${id}`}>Detail</Link>
            </div>
          </div>

          <div className="container start-div">
          <h4 className="light"><strong>Passengers:</strong></h4>
            { bookings ? bookings.map((booking, index) => 
                <div className="last" key={booking.id+index}>
                  <div className="row driver card-detail">
                    <div className="col-8 start">
                      <h5>Buddy: <strong>{booking.user.name}</strong></h5>
                      <Rating>{calculateUserScore(booking.user.score)}</Rating>
                    </div>
                    <img className="img-buddy" src={booking.user.image} alt="Buddy"/>
                  </div>
                </div> 
                ) 
                :
                <h6>There is not Passengers yet</h6>    
            }
          </div>

          <div className="container">
            <h4 className="light"><strong>Comments:</strong></h4>
            <div className="row">
              { journey.comments ? journey.comments.map( (comment) => 
                <div  className="col-4 card-detail m-2" key={comment.id}>
                  <h5><strong>{comment.commentCreator.name}</strong></h5>
                  <p>{comment.content}</p>
                </div> 
                )
                :
                "Loading..."
              }
            </div>
          </div>
        </div>
      </div> 
      </>
      }   
      
      {/* Comment create*/}
      <>
      { user &&
        <div className="container start-div">
          <h4 className="light"><strong>Add a comment</strong></h4>
          <form className="comment" onSubmit={onSubmit}>
            <textarea  
              onChange={handleOnChange} 
              name="content"
              value={comment.content} 
              id="comment" maxLength ="100"></textarea>
            <button type="submit" className="button ">Submit</button>
          </form>
        </div>
      }
      </>

      {/* Form to score journey */}
      <>
      <div className="container start-div">
      {bookings && bookings.map((booking, index) => 
        user.id===booking.user.id && !booking.isValidated ? 
          <div className="col-6" key={booking.id+index}>
            <form className="container row" onSubmit={onSubmitScore}>
              <input type="hidden" name="bookingId" value={booking.id}/>
              <h4><label className="light">Evaluate the journey</label></h4>
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
              <button className="button" type="submit">Submit</button>
            </form>
          </div>
        :
        <div></div>
      )}
      </div>
      </>

    </div> 
  );
}

export default JourneyDetailScreen;
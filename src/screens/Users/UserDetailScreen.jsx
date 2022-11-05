import {logout} from '../../store/AccessTokenStore'
import { getBookings } from '../../services/BookingService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import "../../styles/partials/screens/UserDetailScreen.scss"
import { Link } from 'react-router-dom';
import { getCurrentUser, getListYourJourneys } from '../../services/UserService';
import Card from '../../components/journeys/Card';
import { deleteJourney } from '../../services/JourneyService';
import { calculateUserScore } from '../../helper/scoreHelper';
import Rating from '../../components/journeys/Rating';



function UserDetailScreen() {
  const { user } = useAuthContext();
  const [bookings, setBooking] = useState([]);
  const [journeysOfUser, setJourneys] = useState([]);
  const [score, setScore] = useState([])

  function handleLogout(){
    logout()
      .then(result => console.log("you just logout"))
      .catch(err => console.log(err))
  };

  function handleDlete(id){
    deleteJourney(id)
      .then(result => {
        console.log("Journey has been deleted")
        getJourneysOfCreator()
      })
      .catch(err => console.log(err))
  };

  const getBookingsCallBack = useCallback(() =>{
    getBookings()
      .then( bookings => setBooking(bookings))
      .catch(err => console.log(err))
  },[]);

  const getJourneysOfCreator = useCallback(() => {
    getListYourJourneys()
      .then( journeys => {
        setJourneys(journeys)
      })
      .catch(err => console.log(err))
  },[])

  useEffect( ()=> {
    getBookingsCallBack()
  },[getBookingsCallBack]);

  useEffect( ()=> {
    getJourneysOfCreator()
    getCurrentUser()
      .then( user =>{
        setScore(calculateUserScore(user.score))
      })
  },[getJourneysOfCreator])


  return ( 
    <div className='container'>
      <div className='row'>
        <h3 className='col-8'>Welcome to your profile {user.name} <img className='img-user' src={user.image} alt='Buddy'/></h3>
        <button className="col-2" onClick={handleLogout}>Logout</button>
        <Rating className="text-center">{score}</Rating>
      </div>

      <h3>My booking: </h3>
      <div className='container'>
        {bookings && bookings.map(booking => 
          <div className='card' key={booking.id}>
            <div className='row card-body'>
              <div className='col-8'>
                <h5>From: {booking.journey.origin.street}</h5>
                <h5>To: {booking.journey.destination.street}</h5>
                <h6>Departure time: {booking.journey.departureTime.toString()}</h6>
              </div>
              <div className='col-4'>
                <h5>Driver buddy: {booking.journey.creator.name} <img className='img-user' src={booking.journey.creator.image} alt='buddy'/></h5>
                <h6>Price: {booking.journey.price} €</h6>
                <h6>Seats left: {booking.journey.vehicle.seats}</h6>
              </div>
             
              <Link key={booking.journey.id} to={`/journeys/${booking.journey.id}`}>Go to detail</Link>
            </div>
          </div>
        )
      
        }
      </div>
      <h3>My Journeys</h3>
      <div className='container'>
        { journeysOfUser ? journeysOfUser.map( journey =>
          <div className=' row' key={journey.id}>
            <Card className='col-8' {...journey} />
            <button className='col-4' onClick={() => handleDlete(journey.id)}>Delete</button>
          </div>
        )
        :
         <p>You have not create any journey</p> 
        }
      </div>

      
    </div>
   );
}

export default UserDetailScreen;
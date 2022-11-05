import {logout} from '../../store/AccessTokenStore'
import { getBookings } from '../../services/BookingService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import "../../styles/partials/screens/UserDetailScreen.scss"
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, getListYourJourneys } from '../../services/UserService';
import Card from '../../components/journeys/Card';
import { deleteJourney } from '../../services/JourneyService';
import { calculateUserScore } from '../../helper/scoreHelper';
import Rating from '../../components/journeys/Rating';
import '../../styles/partials/components/Button.scss'
import '../../styles/partials/components/Card.scss'



function UserDetailScreen() {
  const { user } = useAuthContext();
  const [bookings, setBooking] = useState([]);
  const [journeysOfUser, setJourneys] = useState([]);
  const [score, setScore] = useState([])
  const navigate = useNavigate()

  function handleLogout(){
    logout()
      .then(result => console.log("you just logout"))
      .catch(err => console.log(err))
  };
  //Delete
  function handleDlete(id){
    deleteJourney(id)
      .then(result => {
        console.log("Journey has been deleted")
        getJourneysOfCreator()
      })
      .catch(err => console.log(err))
  };
  //Edit --go to form
  function handleUpdate(id){
    console.log("handleUpdate", id);
    navigate(`/journeys/${id}/edit`)
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

  console.log(bookings);

  //PROFILE
  return ( 
    <div className='container'>
      <div className='row'>
        <h3 className='col-8'>Welcome to your profile {user.name} <img className='img-user' src={user.image} alt='Buddy'/></h3>
        <button className="button col-2" onClick={handleLogout}>Logout</button>
        <Rating className="text-center">{score}</Rating>
      </div>

      <h3>My booking: </h3>
      <div className='container'>
        {bookings && bookings.map(booking => 
          <>
          {console.log("booking.journey",booking.journey)}
            <Link className='card' key={booking.journey.id} to={`/journeys/${booking.journey.id}`}>
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
                  <Rating>{calculateUserScore(booking.journey.creator.score)}</Rating>
                </div>
              </div>
            </Link>
          </>
        )
      
        }
      </div>

      <h3>My Journeys</h3>
      <div className='container'>
        { journeysOfUser ? journeysOfUser.map( journey =>
          <div className=' row' key={journey.id}>
            <div className=' container'>
              <Card className='col-8' {...journey} />
              <button className='button col-2' onClick={() => handleDlete(journey.id)}>Delete</button>
              <button className='button col-2' onClick={() => handleUpdate(journey.id)}>Edit</button>
            </div>
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
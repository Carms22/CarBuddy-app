import {logout} from '../../store/AccessTokenStore'
import { getBookings } from '../../services/BookingService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, getListYourJourneys } from '../../services/UserService';
import Card from '../../components/journeys/Card';
import { deleteJourney } from '../../services/JourneyService';
import { calculateUserScore } from '../../helper/scoreHelper';
import { parsePrice } from '../../helper/priceHelper';
import Rating from '../../components/journeys/Rating';
import "../../styles/partials/screens/UserDetailScreen.scss"
import '../../styles/partials/components/Button.scss'
import '../../styles/partials/components/Card.scss'



function UserDetailScreen() {
  const { user } = useAuthContext();
  const [bookings, setBooking] = useState([]);
  const [journeysOfUser, setJourneys] = useState([]);
  const [score, setScore] = useState([])
  const navigate = useNavigate()

  //Logout
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

  console.log("journeys", journeysOfUser);

  //PROFILE 
  return ( 
    <div className='container'>
      <div className='row text-center'>
        <h3 className='col-12'>Welcome to your profile {user.name} <img className='img-user' src={user.image} alt='Buddy'/></h3>
        <Rating className="text-center">{score}</Rating>
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>

      <h3>My booking: </h3>
      <div className='container'>
        {bookings && bookings.map(booking => 
          <>
            <Link className='card' key={booking.journey.id} to={`/journeys/${booking.journey.id}`}>
              <div className='row card-body'>
                <div className='col-6'>
                  <h6><strong>From: </strong>{booking.journey.origin.street}</h6>
                  <h6><strong>To: </strong>{booking.journey.destination.street}</h6>
                  <h6><strong>Departure time: </strong>{booking.journey.departureTime.toString()}</h6>
                  <h6><strong>Date: </strong>{moment(booking.journey.date).format('DD/MM/YYYY')}</h6>
                </div>
                <div className='col-6'>
                  <h6><strong>Driver buddy: </strong>{booking.journey.creator.name} <img className='img-user' src={booking.journey.creator.image} alt='buddy'/></h6>
                  <h6><strong>Price: </strong>{parsePrice(booking.journey.price)}</h6>
                  <h6><strong>Seats left: </strong>{booking.journey.vehicle.seats}</h6>
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
          <div className='link-card'>
            <Card className='card' {...journey} key={journey.id}/>
            <button className='button col-4' onClick={() => handleDlete(journey.id)}>Delete</button>
            <button className='button col-4' onClick={() => handleUpdate(journey.id)}>Edit</button>
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
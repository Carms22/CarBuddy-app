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

  //PROFILE 
  return ( 
    <div className='container User-screen'>
      <div className='row text-center'>
        <h2 className='col-12'>Welcome to your profile {user.name} <img className='img-user' src={user.image} alt='Buddy'/></h2>
        <Rating className="text-center">{score}</Rating>
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>

      <h3 className='h-grey'>My booking: </h3>
      <div className='container'>
        {bookings ? bookings.map(booking => 
          <>
            <Link className='card' key={booking.journey.id} to={`/journeys/${booking.journey.id}`}>
              <div className='row card-body'>
                <div className='col-6'>
                  <h6 className='contrast'>From: <strong>{booking.journey.origin.street}</strong></h6>
                  <h6 className='contrast'>To: <strong>{booking.journey.destination.street}</strong></h6>
                  <h6 className='contrast'>Departure time: <strong>{booking.journey.departureTime.toString()}</strong></h6>
                  <h6 className='contrast'>Date: <strong>{moment(booking.journey.date).format('DD/MM/YYYY')}</strong></h6>
                </div>
                <div className='col-6'>
                  <h6 className='contrast'>Driver buddy: <strong>{booking.journey.creator.name} </strong><img className='img-user' src={booking.journey.creator.image} alt='buddy'/></h6>
                  <h6 className='contrast'>Price: <strong>{parsePrice(booking.journey.price)}</strong></h6>
                  <h6 className='contrast'>Seats left: <strong>{booking.journey.vehicle.seats}</strong></h6>
                  <Rating>{calculateUserScore(booking.journey.creator.score)}</Rating>
                </div>
              </div>
            </Link>
          </>
          )
          :
          <>
            <h6>You have not bookings yet</h6>
          </>
        }
      </div>

      <h3 className='h-grey'>My Journeys</h3>
      <div className='container'>
        { journeysOfUser ? journeysOfUser.map( journey =>
          <div className='link-card'>
            <Card className='card' {...journey} key={journey.id}/>
            <button className='button col-4 m-2' onClick={() => handleDlete(journey.id)}>Delete</button>
            <button className='button col-4 m-2' onClick={() => handleUpdate(journey.id)}>Edit</button>
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
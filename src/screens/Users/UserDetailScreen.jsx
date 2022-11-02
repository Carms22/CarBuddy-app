import {logout} from '../../store/AccessTokenStore'
import { getBookings } from '../../services/BookingService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import "./UserDetailScreen.scss"
import { Link } from 'react-router-dom';


function UserDetailScreen() {
  const { user } = useAuthContext();
  const [bookings, setBooking] = useState([]);

  function handleLogout(){
    logout()
      .then(result => console.log("you just logout"))
  }

  const getBookingsCallBack = useCallback(() =>{
    getBookings()
      .then( bookings => setBooking(bookings))
      .catch(err => console.log(err))
  },[])

  useEffect( ()=> {
    getBookingsCallBack()
  },[getBookingsCallBack])


 console.log("entro", user);
  return ( 
    <div className='container'>
      <div className='row'>
        <h3 className=''>Welcome to your profile {user.name} <img className='img-user' src={user.image} alt='Buddy'/></h3>
      </div>
      <div className='container'>
        {bookings.map(booking => 
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
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
   );
}

export default UserDetailScreen;
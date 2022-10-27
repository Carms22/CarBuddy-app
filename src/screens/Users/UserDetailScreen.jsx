import {logout} from '../../store/AccessTokenStore'
import { getBookings } from '../../services/BookingService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import "./UserDetailScreen.scss"


function UserDetailScreen() {
  const { user } = useAuthContext();
  const [bookings, setBooking] = useState([]);

  function handleLogout(){
    logout()
      .then(result => console.log("you just logout"))
  }

  useEffect( ()=> {
    getBookings()
      .then( bookings => setBooking(bookings))
      .catch(err => console.log(err))
  },[])

 console.log("entro");
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
                <h6>Departure time: {booking.journey.departureTime}</h6>
              </div>
              <div className='col-4'>
                <h5>Driver buddy: {booking.journey.creator}</h5>
                <h6>Price: {booking.journey.price} €</h6>
                <h6>Seats left: {booking.journey.vehicle.seats}</h6>
              </div>
            </div>
          </div>
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
   );
}

export default UserDetailScreen;
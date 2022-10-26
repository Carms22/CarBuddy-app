import {logout} from '../../store/AccessTokenStore'
import { getBookings } from '../../services/BookingService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';


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
    <div>
      <h1>Welcome to your profile {user.name}</h1>
      <div className='container'>
        {bookings.map(booking => 
          <div className='container' key={booking.id}>
            <h3>From {booking.journey.origin.street}</h3>
            <h3>To {booking.journey.destination.street}</h3>
            <h3>Hour: {booking.journey.departureTime}</h3>
          </div>
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
   );
}

export default UserDetailScreen;
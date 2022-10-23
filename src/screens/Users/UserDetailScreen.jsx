import {logout} from '../../store/AccessTokenStore'
import { useAuthContext } from '../../contexts/AuthContext';

function UserDetailScreen() {
  const { user } = useAuthContext()

  function handleLogout(){
    logout()
      .then(result => console.log("you just logout"))
  }
  return ( 
    <div>
      <h1>Welcome to your profile {user.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
   );
}

export default UserDetailScreen;
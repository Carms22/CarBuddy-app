import {logout} from '../../store/AccessTokenStore'
import { useAuthContext } from '../../contexts/AuthContext';

function UserDetailScreen() {
  const { user } = useAuthContext()

  function handleLogout(){
    logout()
  }
  return ( 
    <div>
      Profile
      <button onClick={handleLogout}>Logout</button>
    </div>
   );
}

export default UserDetailScreen;
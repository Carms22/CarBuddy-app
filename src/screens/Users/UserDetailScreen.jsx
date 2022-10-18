import {logout} from '../../store/AccessTokenStore'

function UserDetailScreen() {
  

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
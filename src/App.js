import './styles/styles.scss';
import {Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/Home/HomeScreen';
import Navbar from './components/misc/Navbar/Navbar';
import JourneysList from './screens/Journeys/JourneysList'
import JourneyFormScreen from './screens/Journeys/JourneyFormScreen'
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import UserDetailScreen from './screens/Users/UserDetailScreen';
import ProtectedRoute from "./components/misc/ProtectedRoute";
import UnprotectedRoute from "./components/misc/UnprotectedRoute";
import { useAuthContext } from "./contexts/AuthContext";
import JourneyDetailScreen from './screens/Journeys/JourneyDetailScreen';


function App() {
  const { isAuthFetched } = useAuthContext()
  return (
    <div className="App">
      <Navbar/> 
      {isAuthFetched ? (     
      <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/journeys' element={<JourneysList/>}/>
        <Route path='/journeys/:id' element={<JourneyDetailScreen/>}/>
        <Route path='/journeys/create' element={<JourneyFormScreen/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route 
          path='/login' 
          element={
            <UnprotectedRoute>
              <Login/>
            </UnprotectedRoute>
          }
        />
        <Route 
          path='/profile' 
          element={
            <ProtectedRoute>
              <UserDetailScreen/>
            </ProtectedRoute>
          }
        />
      </Routes>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

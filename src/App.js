import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/Home/HomeScreen';
import Navbar from './components/misc/Navbar/Navbar';
import JourneysList from './screens/Journeys/JourneysList'
import JourneyFormScreen from './screens/Journeys/JourneyFormScreen'
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import UserDetailScreen from './screens/Users/UserDetailScreen';


function App() {
  return (
    <div className="App">
      <Navbar/>      
      <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/journeys' element={<JourneysList/>}/>
        <Route path='/journeys/create' element={<JourneyFormScreen/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<UserDetailScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;

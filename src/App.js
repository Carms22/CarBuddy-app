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
import ErrorScreen from '../src/screens/Error/ErrorScreen';
import CreatorScreenDetail from './screens/Creator/CreatorScreenDetail';
import Footer from './components/misc/footer/Footer';
import { ContactUs } from './screens/Contact/Contact';
import PaymentScreen from './screens/PaymentScreen/PaymentScreen';


function App() {
  const { isAuthFetched } = useAuthContext()
  return (
    <div className="App">
      <Navbar/> 
      {isAuthFetched ? (     
      <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/journeys' element={<JourneysList/>}/>
        <Route path='/creators/:id' element={<CreatorScreenDetail/>}/>
        <Route path='/journeys/:id' element={<JourneyDetailScreen/>}/>
        
        <Route path='/journeys/create' element={<JourneyFormScreen/>}/>
        <Route path='/journeys/:id/edit' element={<JourneyFormScreen/>}/>

        <Route path='/register' element={<Register/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/payment/:id' element={<PaymentScreen/>}/>
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
        <Route path="*" element={<ErrorScreen/>} />
      </Routes>
      
      ) : (
        <p>Loading...</p>
      )}
      <Footer/>
    </div>
  );
}

export default App;

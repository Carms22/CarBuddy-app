import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/Home/HomeScreen';
import Navbar from './components/misc/Navbar';
import JourneysList from './screens/Journeys/JourneysList'


function App() {
  return (
    <div className="App">
      <Navbar/>      
      <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/journeys' element={<JourneysList/>}/>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/' element={<HomeScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;

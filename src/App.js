import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/Home/HomeScreen';


function App() {
  return (
    <div className="App">
      <h1>HOLAAAAAAAAAAAAAAAAAA!!!!!!!!!!!!</h1>
      <Routes>
        <Route path='/' element={<HomeScreen/>}/>
      </Routes>
 
    
    </div>
  );
}

export default App;

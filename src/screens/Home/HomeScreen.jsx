import React from 'react';
import MapComponent from '../../components/misc/MapComponent/MapComponent';
import JourneysList from '../Journeys/JourneysList';
import './HomeScreen.scss'


const HomeScreen = () => {
 
  return (
    <div className="HomeScreen ">
    <h2>Welcome</h2>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <h4>The map show all the rides available, click on the car to show the information of the journey</h4>

          </div>
          <div className='col-6'>
            
          </div>
        </div>
      </div>
      <MapComponent />
      <div className="bg-dark p-5">
        <div class="row">     
          <div class="">
            <JourneysList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
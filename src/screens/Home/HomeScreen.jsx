import React from 'react';
import MapComponent from '../../components/misc/MapComponent/MapComponent';
import JourneysList from '../Journeys/JourneysList';
import './HomeScreen.scss'


const HomeScreen = () => {
 
  return (
    <div className=" ">
      <div className='HomeScreen'>
      <h2>Welcome</h2>
        <div className=' container '>
          <div className='row '>
            <div className='col-sm m-1 card transparent'>
              <h5>The map show all the rides available, click on the car to show the information of the journey</h5>
            </div>
            <div className='col-sm m-1 card transparent'>
              <h5>The map show all the rides available, click on the car to show the information of the journey</h5>
            </div>
            <div className='col-sm m-1 card transparent'>
              <h5>The map show all the rides available, click on the car to show the information of the journey</h5>
            </div>
          </div>
        </div>
        
      </div>
      <MapComponent />
      <div className="p-5">
        <div className="row">     
          <div className="">
            <JourneysList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
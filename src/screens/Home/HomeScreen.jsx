import React from 'react';
import MapComponent from '../../components/misc/MapComponent/MapComponent';
import JourneysList from '../Journeys/JourneysList';
import '../../styles/partials/screens/HomeScreen.scss'



const HomeScreen = () => {
 
  return (
    <div className=" ">
      <div className='HomeScreen'>
      <h2>Don't go to work alone, take a Buddy</h2>
        <div className=' container'>
          <div className='row '>
            <div className='col-sm m-1 card transparent info'>
              <h3>Choose your destination</h3>
              <img className='' src='../../../public/img/home/intenso-trafico-city.png' alt='trafic'/>
              <h5>There are so many cars going to the same place just with one person. Why don't you go with them?</h5>
              <h5>Check the journeys that goes where you work and decided what departure point is for you! </h5>
            </div>
            <div className='col-sm m-1 card transparent info'>
              <h3>Be a Buddy</h3>
              <img className='' src='../../../public/img/home/extraterrestre_1.png' alt='Buddy'/>
              <h5>The map show all the rides available, click on the car to show the information of the journey</h5>
            </div>
            <div className='col-sm m-1 card transparent info'>
              <h3>Be a Driver</h3>
              <img className='' src='../../../public/img/home/llegada.png' alt='end'/>
              <h5>The map show all the rides available, click on the car to show the information of the journey</h5>
            </div>
          </div>
        </div>
        
      </div>
      <h3>Check the buddies that goes to your work destination</h3>
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
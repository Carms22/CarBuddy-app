import React from 'react';
import MapComponent from '../../components/misc/MapComponent/MapComponent';
import JourneysList from '../Journeys/JourneysList';
import '../../styles/partials/screens/HomeScreen.scss';
import trafic from '../../styles/image/home/driver-amico.svg';
import buddy from '../../styles/image/home/car-people.PNG';
import end from '../../styles/image/home/Location-bro.svg';

const HomeScreen = () => {
 
  return (
    <div className=" ">
      <div className='HomeScreen'>
        <h2 className='pale'>Don't go to work alone</h2>
        <h1 className='take'>Take a Buddy!</h1>
        <div className='container header-home'>    
        </div>

        <div className=' container'>
          <div className='row'>
            <div className='col-sm m-1 card info'>
              <h3>Cars with only one passenger all the time</h3>
              <img className='' src={trafic} alt='trafic'/>
              <h5>There are so many cars going to the same place just with one person. Why don't you go with them?</h5>
              <h5>Check the journeys that goes where you work and decide what departure point is for you! </h5>
            </div>
            <div className='col-sm m-1 card info'>
              <h3>Be the best Buddy going to work </h3>
              <img className='' src={buddy} alt='Buddy'/>
              <h5>
              Just if you go all days by car to work or you want to take advantage of others journeys, register and
              start to share the way or way back to work!!
              </h5>
            </div>
            <div className='col-sm m-1 card info'>
              <h3>Check the journeys on the map</h3>
              <img className='' src={end} alt='end'/>
              <h5>The map shows all the destination rides available, click on the car to show the information of the journey</h5>
            </div>
          </div>
        </div>
      </div>

      <div className='container Map'>
        <h2>Check the buddies that goes to your work destination</h2>
        <MapComponent />
      </div>

        <div className="row">     
          <div className="link-card">
            <JourneysList />
          </div>
      </div>

    </div>
  );
};

export default HomeScreen;
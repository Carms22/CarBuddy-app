import React from 'react';
//import ThemeContext from '../../contexts/ThemeContext';
import './HomeScreen.css'
import JourneysList from '../Journeys/JourneysList';

const HomeScreen = () => {
  //const { theme, updateContext } = useContext(ThemeContext)

  return (
    <div className="HomeScreen">
      <div className="jumbotron bg-dark p-5">
        <h1 className="display-4">Hello, world!</h1>
        <div class="row">
          <div class="col-sm-6">
            <JourneysList />
          </div>
        </div>
        {/* <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-4" />
        <p>It uses utility classNamees for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <a onClick={updateContext} className="btn btn-primary btn-lg" href="#" role="button">Change Navbar theme</a>
        </p> */}
      </div>
    </div>
  );
};

export default HomeScreen;
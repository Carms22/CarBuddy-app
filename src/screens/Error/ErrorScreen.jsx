import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/partials/components/Button.scss'
import '../../styles/partials/screens/ErrorScreen.scss'

const EroroScreen = () => {
  return (
  <div className="Error">
    <div className="error-text">
      <h1 className="margin-err">404</h1>
      <h2 className="margin-err">Not Found</h2>
      <h3 className="margin-err">Sorry, the requested page was not found.</h3>
      <Link to="/" className="btn button">Go Home</Link>
    </div>
  </div>
  );
};

export default EroroScreen;
import React from "react";
import '../../styles/partials/components/Popup.scss'

const Popup = ({ feature }) => {
  const { id, origin, destination, departureTime } = feature.properties;

  return (
    <div className="Popup" id={`popup-${id}`}>
      <h6><strong>From: </strong>{origin}</h6>
      <h6><strong>To: </strong>{destination}</h6>
      <h6><strong>Hour: </strong>{departureTime}</h6>
      <a href={`/journeys/${id}`}>Click for details</a>
    </div>
  );
};

export default Popup;
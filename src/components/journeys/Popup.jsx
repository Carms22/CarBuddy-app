import React from "react";

const Popup = ({ feature }) => {
  const { id, origin, destination, departureTime } = feature.properties;
  console.log('object :>> ', feature);
  return (
    <div id={`popup-${id}`}>
      <h6><strong>From: </strong>{origin}</h6>
      <h6><strong>To: </strong>{destination}</h6>
      <h6><strong>Hour: </strong>{departureTime}</h6>
      <a href={`/journeys/${id}`}>Click for details</a>
    </div>
  );
};

export default Popup;
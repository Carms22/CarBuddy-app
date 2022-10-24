import React from "react";


//from to ....driver...
const Popup = ({ feature }) => {
  const { id, origin, destination } = feature.properties;
  console.log('object :>> ', feature);
  return (
    <div id={`popup-${id}`}>
      <h3>{origin}</h3>
      {destination}
    </div>
  );
};

export default Popup;
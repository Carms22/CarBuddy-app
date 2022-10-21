import React from "react";


//from to ....driver...
const Popup = ({ feature }) => {
  const { id, name, description } = feature.properties;

  return (
    <div id={`popup-${id}`}>
      <h3>{name}</h3>
      {description}
    </div>
  );
};

export default Popup;
import ReactMapGL from "react-map-gl";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken=
"pk.eyJ1IjoiY2FybXNieWRkeSIsImEiOiJjbDloY2tkdjQyZ29iM3BxdDg2enlmeTcwIn0.NgmXVYbTuJuWFyyxOxJC7Q"

function MapComponent() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-3.7035825);
  const [lat, setLat] = useState(40.4167047);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  return (  
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default MapComponent;
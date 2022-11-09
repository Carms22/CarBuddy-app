import React, { useRef, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from 'mapbox-gl';
import Popup from "../../journeys/Popup";
import "../../../styles/partials/components/MapComponent.scss";
import fetchJourneyData from "../../../data/journeys";


mapboxgl.accessToken=
"pk.eyJ1IjoiY2FybXNieWRkeSIsImEiOiJjbDloY2tkdjQyZ29iM3BxdDg2enlmeTcwIn0.NgmXVYbTuJuWFyyxOxJC7Q"

function MapComponent() {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
   
  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [-3.7035825, 40.4167047],
      zoom: 9,
    });

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    
    map.on("load", () => {
      // add the data source for new a feature collection with no features
      map.addSource("points-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });
     
      // now add the layer, and reference the data source above by name
      map.addLayer({
        id: "points-layer",
        source: "points-data",
        type: "symbol",
        layout: {
          // full list of icons here: https://labs.mapbox.com/maki-icons
          "icon-image": "car-15", // this will put little cars on our map
          "icon-padding": 0,
          "icon-size": 1.2,
          "icon-allow-overlap": true,
        }
      });
    });


    map.on("moveend", async () => {
      fetchJourneyData().then( result => {
        map.getSource("points-data").setData(result);
      })
      // all layers that consume the "points-data" data source will be updated automatically
      
    });

    // change cursor to pointer when user hovers over a clickable feature
    map.on("mouseenter", "points-layer", e => {
      if (e.features.length) {
        map.getCanvas().style.cursor = "pointer";
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on("mouseleave", "points-layer", () => {
      map.getCanvas().style.cursor = "";
    });

    // add popup when user clicks a point
    map.on("click", "points-layer", e => {
      if (e.features.length) {
        const feature = e.features[0];
        // create popup node
        const popupNode = document.createElement("div");
        const root =createRoot(popupNode)
        root.render(<Popup feature={feature} /> );
        // set popup on map
        popUpRef.current
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(popupNode)
          .addTo(map);
      }
    });


    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: false, // Do not use the default marker style
      placeholder: "Search for journey destinations", // Placeholder text for the search bar
      bbox: [-4.118500,40.272136,-3.251267,40.574271], // Boundary for Madrid [lng, lat]
      proximity: {
        longitude: -3.684883,
        latitude: 40.423374
      } 
    });
        
    // Add the geocoder to the map
    map.addControl(geocoder);
    // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection

    geocoder.on('result', (event) => {
      map.getSource('single-point').setData(event.result.geometry);
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="map-container" ref={mapContainerRef}></div>
  );
}

export default MapComponent;
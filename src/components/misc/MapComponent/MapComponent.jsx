import React, { useRef, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import Popup from "../../journeys/Popup";
import "./MapComponent.scss";
import SearchBar from "../SearchBar.jsx/SearchBar";
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
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-3.7035825, 40.4167047],
      zoom: 12
    });

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    
    map.on("load", () => {
      // add the data source for new a feature collection with no features
      map.addSource("random-points-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });
      // now add the layer, and reference the data source above by name
      map.addLayer({
        id: "random-points-layer",
        source: "random-points-data",
        type: "symbol",
        layout: {
          // full list of icons here: https://labs.mapbox.com/maki-icons
          "icon-image": "car-15", // this will put little croissants on our map
          "icon-padding": 0,
          "icon-allow-overlap": true
        }
      });
    });


    map.on("moveend", async () => {
      
      // fetch new data
      const results = await fetchJourneyData().then(results =>{
        return results
      })
      // update "random-points-data" source with new data
      // all layers that consume the "random-points-data" data source will be updated automatically
      map.getSource("random-points-data").setData(results);
    });

    // change cursor to pointer when user hovers over a clickable feature
    map.on("mouseenter", "random-points-layer", e => {
      if (e.features.length) {
        map.getCanvas().style.cursor = "pointer";
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on("mouseleave", "random-points-layer", () => {
      map.getCanvas().style.cursor = "";
    });

    // add popup when user clicks a point
    map.on("click", "random-points-layer", e => {
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

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
  <div className="map-container" ref={mapContainerRef} >
    <SearchBar/>
  </div>
  
  );

}

export default MapComponent;
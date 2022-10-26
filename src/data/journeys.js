
import {getJourneys} from "../services/JourneyService"

const fetchJourneyData = () => {
    const newFeaturesList = [];
    return getJourneys().then(journeys => {

      journeys.map((journey) => ( 
        newFeaturesList.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: journey.origin.location
          },
          properties: {
            id: journey.id,
            origin: journey.origin.street,
            destination: journey.destination.street,
          }
        })
      ))
      return {
        type: "FeatureCollection",
        features: newFeaturesList
      }
      
    })
};


export default fetchJourneyData;
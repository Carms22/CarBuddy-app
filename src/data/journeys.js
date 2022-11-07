
import {getJourneys} from "../services/JourneyService"

const fetchJourneyData = () => {
    
    const newFeaturesList = [];
    return getJourneys().then(journeys => {

      journeys.map((journey) => ( 
        newFeaturesList.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: journey.destination.location
          },
          properties: {
            id: journey.id,
            origin: journey.origin.street,
            destination: journey.destination.street,
            departureTime: journey.departureTime
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
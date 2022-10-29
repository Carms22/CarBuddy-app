import { useState, useEffect } from "react";
import Card from "../../components/journeys/Card";
import SearchBar from "../../components/misc/SearchBar.jsx/SearchBar";
import {getJourneys} from '../../services/JourneyService'
import {getJourneysFromSearch} from '../../services/MiscService'

function JourneysList (){
  const [journeys, setJourneys] = useState([]);
  const [data, setData] = useState([]);
  
  
  const handleSearchBar = (lat, long) => {
    setData([long, lat])
  }
  const onSubmit =(event) => {
    event.preventDefault()
    getJourneysFromSearch(data)
      .then(journeysFetched => setJourneys(journeysFetched))
  }

  useEffect( ()=> {
    getJourneys()
      .then( journeys => {
        setJourneys(journeys)
      })
      .catch(err => console.log(err))
  },[])


  return(
    <div>
      <h1>Journeys List</h1>
        <form onSubmit={onSubmit}>
          <SearchBar 
            name="destination"
            handleSearchBar={handleSearchBar}
            placeholder="Filter by destination of the journey"
          />
          <button type="submit">Search</button>
        </form>
        <div>
          { journeys?
            journeys.map( journey => (
            <Card {...journey} key={journey.id}/>
          ))
          :
          <p>No journey this time</p>
          }
          
        </div>
        
    </div>
  )
}



export default JourneysList;
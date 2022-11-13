import { useState, useEffect, useCallback } from "react";
import Card from "../../components/journeys/Card";
import SearchBar from "../../components/misc/SearchBar.jsx/SearchBar";
import {getJourneys} from '../../services/JourneyService'
import {getJourneysFromSearch} from '../../services/MiscService'
import '../../styles/partials/components/Card.scss'
import '../../styles/partials/screens/JourneyListScreen.scss'

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

  const getAllJourneys = useCallback(() => {
    getJourneys()
    .then( journeys => {
      setJourneys(journeys)
    })
    .catch(err => err)
  },[])

  const onClear = () => {
    getAllJourneys();
    setData("")
  }

  useEffect(()=> {
    getAllJourneys()
  }, [getAllJourneys])

  return(
    <div className="JourneyList">
      <h1>Journeys List</h1>
        <form onSubmit={onSubmit}>
          <SearchBar 
            name="destination"
            handleSearchBar={handleSearchBar}
            placeholder="Filter by destination of the journey"
          />
          <div>
            <button className="button col-4" type="submit">Search</button>
            <button className="button col-4" type="submit" onClick={() => onClear()}>Clear</button>
          </div>
        </form>
        <div className="container link-card">
          { journeys ?
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
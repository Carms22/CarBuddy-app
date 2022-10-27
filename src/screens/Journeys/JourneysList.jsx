import { useState, useEffect } from "react";
import Card from "../../components/journeys/Card";
import SearchBar from "../../components/misc/SearchBar.jsx/SearchBar";
import {getJourneys} from '../../services/JourneyService'
import {postLatLong} from '../../services/MiscService'

function JourneysList (){
  const [journeys, setJourneys] = useState([]);
  const [data, setData] = useState([]);
  
  
  const handleSearchBar = (lat, long) => {
    console.log("estoy en el handlesearch bar... lat:", lat);
    setData([long, lat])
  }
  const onSubmit =(event) => {
    event.preventDefault()
    console.log("estoy en el onSubmit");
    postLatLong(data)
  }
  console.log(data);

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
            placeholder="Destination of the journey"
          />
          <button type="submit">Search</button>
        </form>
        {journeys.map( journey => (
          <Card {...journey} key={journey.id}/>
        ))}
    </div>
  )
}



export default JourneysList;
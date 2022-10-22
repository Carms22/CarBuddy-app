import { Evented } from "mapbox-gl";
import { useState } from "react";
import { postJourney } from "../../services/JourneyService";
import { getCurrentUser } from "../../services/UserService";
import Input from "../misc/Input";
import SearchBar from "../misc/SearchBar.jsx/SearchBar";

/// USAR EL CONTEXT user
function JourneyForm() {
  const [data, setData] = useState({
    origin: {
      street: "",
      location: []
    },
    destination: {
      street: "",
      location: []
    },
    vehicle: {
      typeOf:"",
      seats:""
      },
    departureTime: "" ,
    returnTime: "",
    price: "",
    date: "",
    creator: ""
  })

  const handleOnChange = (event) => {
      const { name, value } = event.target
      const creator = getCurrentUser()
      setData({...data, [name]: value, creator: creator})
  }
  const handleOnChangeVehicle = (event) => {
    const { name } = event.target
    const {value} =event.target
    console.log("name", name);
    console.log("value",value);
     

    setData({
      ...data,
      vehicle: {
        ...data.vehicle,
        [name]: value
      }
    })
    console.log(data);
  }

  const handleSearchBar = (lat, long, text, fieldName) => {
    const value = {
      street: text,
      location: [long, lat]
    };
    setData({...data, [fieldName]: value})
  }

  const onSubmit = ( event )=> {
    event.preventDefault()
    postJourney(data)
  }

  return ( 
    <div className="container">
      <form onSubmit={onSubmit}>
        <Input 
           type="text"
            name="typeOf" id="typeOf"
            value={data.vehicle.typeOf} onChange={handleOnChangeVehicle}
            placeholder="Type of vehicle"
            required
        />
        <Input 
           type="text"
            name="seats" id="seats"
            value={data.vehicle.seats} onChange={handleOnChangeVehicle}
            placeholder="Number of seats"
            required
        />

          <SearchBar 
            name="origin"
            handleSearchBar={handleSearchBar}
            placeholder="Origin of the journey"
          />

          <SearchBar 
            name="destination"
            handleSearchBar={handleSearchBar}
            placeholder="Destination of the journey"
          />

          <Input 
            type="date"
            name="date" id="date"
            value={data.date} onChange={handleOnChange}
            placeholder="Date of the journey"
            required
          />

          <Input type="number"
            name="departureTime" id="departureTime"
            value={data.departureTime} onChange={handleOnChange}
            placeholder="Departure time of the journey"
            required
          />
    
          <Input type="number"
            name="price" id="price"
            value={data.price} onChange={handleOnChange}
            placeholder="Prices of the journey"
            required
          />


        <button>Submit</button>
      </form>
    </div>
   );
}

export default JourneyForm;
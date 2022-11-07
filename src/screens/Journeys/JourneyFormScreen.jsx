import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import { getJourneyDetail, postJourney, updateJourney } from "../../services/JourneyService";
import { getCurrentUser } from "../../services/UserService";
import Input from "../../components/misc/Input";
import SearchBar from "../../components/misc/SearchBar.jsx/SearchBar";
import '../../styles/partials/screens/JourneyFormScreen.scss'


function JourneyForm() {
  const { id } = useParams()
  const navigate = useNavigate();
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
  });

  useEffect(() => {
    if (id) {
      getJourneyDetail(id)
        .then(journey => {
          setData({
            ...journey,
            date: moment(journey.date).format('YYYY-MM-DD')
          })
        })
    }
  }, [id])

  const handleOnChange = (event) => {
      const { name, value } = event.target
      const creator = () => {
        getCurrentUser()
          .then( user => user)
      }
      setData({...data, [name]: value, creator: creator})
  }
  const handleOnChangeVehicle = (event) => {
    const { name } = event.target
    const {value} =event.target
    setData({
      ...data,
      vehicle: {
        ...data.vehicle,
        [name]: value
      }
    })
  }

  const handleSearchBar = (lat, long, text, fieldName) => {
    const value = {
      location: [long, lat],
      street: text,
    };
    setData({...data, [fieldName]: value})
  }

  const onSubmit = ( event )=> {
    console.log(data);
    event.preventDefault()
    if (id) {
      updateJourney(id, data)
        .then( journeyUpdated => {
          navigate(`/journeys/${id}`)
        })
    } else {
      postJourney(data)
        .then(result => {
          navigate("/profile")
        })
    }
  }
  const handleCancel = () => {
    navigate(`/journeys/${id}`)
  }

  return ( 
    
    <div className="FormScreen">
    <h1>{id ? 'Update Journey!' : 'Create Journey!'}</h1>
      <form className="start-div" onSubmit={onSubmit}>
        <select 
          className="select"
            type="text"
            name="typeOf" id="typeOf"
            value={data.vehicle.typeOf} onChange={handleOnChangeVehicle}
            placeholder="Type of vehicle"
            required
        >
          <option value="" disabled>Select an option</option>
          <option value="Car">Car</option>
          <option value="Motorcycle">Motorcycle</option>
        </select>

        <SearchBar 
          className="Input"
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
          type="text"
          name="seats" id="seats"
          value={data.vehicle.seats} onChange={handleOnChangeVehicle}
          placeholder="Number of seats"
          required
        />

        <Input 
          className="Input"
          type="date"
          name="date" id="date"
          value={data.date} onChange={handleOnChange}
          placeholder="Date of the journey"
          required
        />

        <Input 
          className="Input"
          type="time"
          name="departureTime" id="departureTime"
          value={data.departureTime} onChange={handleOnChange}
          placeholder="Departure time of the journey"
          required
        />

        <Input 
          className="Input"
          type="time"
          name="returnTime" id="returnTime"
          value={data.returnTime} onChange={handleOnChange}
          placeholder="Return time of the journey"
          required
        />
  
        <Input 
          className="Input"
          type="number"
          name="price" id="price"
          value={data.price} onChange={handleOnChange}
          placeholder="Prices of the journey"
          required
        />
        <div className="">
          <button className="col-4 button">Submit</button>
          {id && <button className="col-4 button" onClick={() => handleCancel(id)}>Cancel</button>}
        </div>
      </form>
    </div>
   );
}

export default JourneyForm;
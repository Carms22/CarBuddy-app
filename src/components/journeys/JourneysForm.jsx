import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJourney } from "../../services/JourneyService";
import { getCurrentUser } from "../../services/UserService";
import Input from "../misc/Input";
import SearchBar from "../misc/SearchBar.jsx/SearchBar";


function JourneyForm() {
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
      location: [lat,long],
      street: text,
    };
    setData({...data, [fieldName]: value})
  }

  const onSubmit = ( event )=> {
    console.log(data);
    event.preventDefault()
    postJourney(data)
      .then(result => {
        navigate("/profile")
      })
  }

  // const onSubmit = (event) => {
  //   event.preventDefault()

  //   if (edit) {
  //     updateUser(id, user).then(user => console.log(user))
  //   } else {
  //     createUser(user).then(user => console.log(user))
  //   }
  // }

  // useEffect(() => {
  //   if (edit) {
  //     getDetail(id)
  //       .then(user => setUser(user))
  //   }
  // }, [id, edit])

  return ( 
    
    <div className="container">
    {/* <h1>{edit ? 'Update Journey!' : 'Create Journey!'}</h1> */}
      <form onSubmit={onSubmit}>
        <select 
           type="text"
            name="typeOf" id="typeOf"
            value={data.vehicle.typeOf} onChange={handleOnChangeVehicle}
            placeholder="Type of vehicle"
            required
        >
          <option value="" disabled>Select an option</option>
          <option value="Car">Car</option>
          <option value="Motocycle">Motocycle</option>
        </select>
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
            name="returnTime" id="returnTime"
            value={data.returnTime} onChange={handleOnChange}
            placeholder="Return time of the journey"
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
import { useState } from "react";
import { postJourney } from "../../services/JourneyService";
import { getCurrentUser } from "../../services/UserService";
/// USAR EL CONTEXT user
function JourneyForm() {
  const [data, setData] = useState({
    origin: "",
    destination: "",
    seats: "",
    departureTime: "" ,
    returnTime: "",
    price: "",
    date: "",
    creator: ""
  })

  const handleOnChange = (event) => {
    const { name, value} = event.target
    const creator = getCurrentUser()
    setData({...data, [name]: value, creator: creator})
  }

  const onSubmit = ( event )=> {
    event.preventDefault()
    console.log(data);
    postJourney(data)
  }

  return ( 
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <input type="number"
            name="seats" id="seats"
            value={data.seats} onChange={handleOnChange}
            placeholder="Number of seats"
            required
          />
        </div>

        <div className="mb-3">
          <input type="text"
            name="origin" id="origin"
            value={data.origin} onChange={handleOnChange}
            placeholder="Origin of the journey"
            required
          />
        </div>

        <div className="mb-3">
          <input type="text"
            name="destination" id="destination"
            value={data.destination} onChange={handleOnChange}
            placeholder="Destination of the journey"
            required
          />
        </div>
      <div className="mb-3">
          <input type="date"
            name="date" id="date"
            value={data.date} onChange={handleOnChange}
            placeholder="Date of the journey"
            required
          />
        </div>
        <div className="mb-3">
          <input type="number"
            name="departureTime" id="departureTime"
            value={data.departureTime} onChange={handleOnChange}
            placeholder="Departure time of the journey"
            required
          />
        </div>
        <div className="mb-3">
          <input type="number"
            name="price" id="price"
            value={data.price} onChange={handleOnChange}
            placeholder="Prices of the journey"
            required
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
   );
}

export default JourneyForm;
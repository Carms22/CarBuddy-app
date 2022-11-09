import {  Link } from 'react-router-dom';
import moment from 'moment'; 
import { parsePrice } from "../../helper/priceHelper";
import { calculateUserScore } from "../../helper/scoreHelper";
import Rating from "./Rating";
import '../../styles/partials/components/Card.scss'

function Card({origin, destination, price, departureTime, date, id, creator, vehicle, score}){
  console.log("creator", creator);

  return(
    <Link key={id} className="Link" to={`/journeys/${id}`} >
      
      <div className="card">
        <div className="card-body row">
          <div className="col-6">
            <h6 className="card-title contrast">From:<strong> {origin.street}</strong></h6>
            <h6 className="card-title contrast">To:<strong> {destination.street}</strong></h6>
            <h6 className='contrast'>Date:<strong> {moment(date).format('DD/MM/YYYY')}</strong> - Departure time:<strong> {departureTime}</strong></h6>
            {score && <Rating>{calculateUserScore(score)}</Rating>}
          </div>
          <div className="col-6">
            <h6 className='contrast'>Driver: <strong>{creator.name}</strong><img className='img-user' src={creator.image} alt={creator.name}/></h6>
            <p className="card-text contrast">Price: <strong> {parsePrice(price)} </strong>- Seats left:<strong> {vehicle.seats}</strong></p>
            {creator.score && <Rating>{calculateUserScore(creator.score)}</Rating>}
          </div>
        </div>
      </div>
    </Link>
  )
}
export default Card;
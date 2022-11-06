import {  Link } from 'react-router-dom';
import moment from 'moment'; 
import { parsePrice } from "../../helper/priceHelper";
import { calculateUserScore } from "../../helper/scoreHelper";
import Rating from "./Rating";
import '../../styles/partials/components/Card.scss'

function Card({origin, destination, price, departureTime, creator, date,id, vehicle, score}){
 
  return(
    <Link key={id} className="" to={`/journeys/${id}`} >
      <div className="card">
        <div className="card-body row">
          <div className="col-6">
            <h6 className="card-title"><strong>From:</strong> {origin.street}</h6>
            <h6 className="card-title"><strong>To:</strong> {destination.street}</h6>
            <h6><strong>Date:</strong> {moment(date).format('DD/MM/YYYY')}<strong> - Departure time:</strong> {departureTime}</h6>
            <Rating>{calculateUserScore(score)}</Rating>
          </div>
          <div className="col-6">
            <h6>Driver: {creator.name}<img className='img-user' src={creator.image} alt='Buddy'/></h6>
            <p className="card-text">Price: {parsePrice(price)}-<strong>Seats left:</strong> {vehicle.seats}</p>
            <Rating>{calculateUserScore(creator.score)}</Rating>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default Card;
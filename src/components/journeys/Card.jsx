import {  Link } from 'react-router-dom';
import moment from 'moment'; 
import { parsePrice } from "../../helper/priceHelper";
import { calculateUserScore } from "../../helper/scoreHelper";
import Rating from "./Rating";
import '../../styles/partials/components/Card.scss'

function Card({origin, destination, price, departureTime, creator, date,id, vehicle, score}){
 
  return(
    <Link key={id} className="m-1" to={`/journeys/${id}`} >
      <div className="card">
        <div className="card-body row">
          <div className="col-6">
            <h6 className="card-title"><strong>From: {origin.street}</strong></h6>
            <h6 className="card-title"><strong>To: {destination.street}</strong></h6>
            <h6><strong>Date: {moment(date).format('DD/MM/YYYY')} - Departure time: {departureTime}</strong></h6>
            <Rating>{calculateUserScore(score)}</Rating>
          </div>
          <div className="col-6">
            <h6>Driver: {creator.name}<img className='img-user' src={creator.image} alt='Buddy'/></h6>
            <Rating>{creator.score}</Rating>
            <p className="card-text">Price: {parsePrice(price)}-<strong>Seats left: {vehicle.seats}</strong></p>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default Card;
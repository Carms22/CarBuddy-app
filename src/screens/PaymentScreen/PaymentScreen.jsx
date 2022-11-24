import { useParams } from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckOutForm";
import { getJourneyDetail } from "../../services/JourneyService";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import "../../styles/partials/screens/PaymentScreen.scss"
const stripePromise = loadStripe("pk_test_51M72OHBtcXUZd8qes0Gbafnjf882Gs898GPCcBLv2aPveRwOynpGvf0hPVn0ORaPvLInDsZ34MVOHi1R0fCQNVnp00Uh23qZqH") //conect to stripe

const PaymentScreen = () => {
  const {id}= useParams();
  const [journeyDetails, setJourney] = useState()

  //Journey details
  const getDetails = useCallback(() => {
    getJourneyDetail(id)
    .then( journey => {
      setJourney(journey)
    })
    .catch(err => console.log(err))
  },[id])

  useEffect(() =>{
    getDetails()
  }, [getDetails])
  console.log("payment screen",journeyDetails);

  return (  
    <>
    {journeyDetails ?
    <Elements stripe={stripePromise}>
      <div className="p-4 row text-center">
        <div className="container p-4">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <CheckoutForm journey={journeyDetails} />
            </div>
          </div>

        <div className="col-md-4 offset-md-4">
            <div className="card resume">
              <h5>Resume</h5>
              <p className="light"><strong>{moment(journeyDetails.date).format('dddd, LL')}</strong></p>
              <div className="card-detail">
                <p>From: <strong> {journeyDetails.origin.street}</strong></p>
                <p>Departure time:<strong>{journeyDetails.departureTime}</strong></p>
              </div>
              <div className="card-detail">
                <p>To: <strong> {journeyDetails.destination.street}</strong></p>
                <p>Return hour: <strong>{journeyDetails.returnTime}</strong></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Elements>
    :
    <div class="spinner-border text-secondary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    }
    </>
  );
}

export default PaymentScreen;
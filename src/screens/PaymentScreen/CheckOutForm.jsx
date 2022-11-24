// import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
// import { postPayment } from '../../services/MiscService';
// import { useNavigate } from 'react-router-dom';
// import { parsePrice } from "../../helper/priceHelper";


// function CheckoutForm ( journey ) {
  
//   const stripe = useStripe();  //conect stripe
//   const elements = useElements(); //use the inputs
//   const navigate = useNavigate()
   
//   console.log("journey", journey.journey);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const {error, paymentMethod} = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement)
//     })
//     try{
//       if(!error){
//         console.log("handle on submit",paymentMethod);
//         const { id } = paymentMethod;
//         postPayment({ id, amount: journey.journey.price*100})
//           .then( payment => {
//             console.log( "payment to navigate",payment);
//             navigate(`/profile`)
//           })
        
//       }
//       //elements.getElement(CardElement).clear()
      
//     }catch(error){
//       console.log(error);
//     }
//   }
    
//   return (

//     <form className='card card-body' onSubmit={handleSubmit}>
//       <h6>Price:{parsePrice(journey.journey.price)}</h6>
//       <CardElement />
//       <button className="button" disabled={!stripe}>Pay</button>
//     </form>

//   )
// };

// export default CheckoutForm;
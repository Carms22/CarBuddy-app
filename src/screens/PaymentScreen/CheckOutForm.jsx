import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';


const CheckoutForm = () => {
  const stripe = useStripe();  //conect stripe
  const elements = useElements(); //use the inputs

  const handleSubmit = async (event) => {
     event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })
    
    if(!error){
      console.log(paymentMethod);
    }


  };

  return (
    <form className='card card-body' onSubmit={handleSubmit}>
      <CardElement/>
      <button className="button" disabled={!stripe}>Pay</button>
    </form>
  )
};

export default CheckoutForm;
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../../styles/partials/screens/Login.scss'

const YOUR_SERVICE_ID = process.env.REACT_APP_YOUR_SERVICE_ID
const YOUR_TEMPLATE_ID = process.env.REACT_APP_YOUR_TEMPLATE_ID
const REACT_APP_YOUR_PUBLIC_KEY = process.env.REACT_APP_YOUR_PUBLIC_KEY

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm( YOUR_SERVICE_ID, 
      YOUR_TEMPLATE_ID, 
      form.current, 
      REACT_APP_YOUR_PUBLIC_KEY,
      )
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      }
      );
    e.target.reset()
  };

  return (
    <div className="Login container">
      <div className="start-div">
        <div className="login-box">
          <h2 className='contact'>Contact me:</h2>
          <form className='container' ref={form} onSubmit={sendEmail}>
            <div className='login-input'>
              <input
                placeholder='Your name' 
                type="text" 
                name="user_name" 
                required
              />
            </div>
            <div className='login-input'>
              <input 
                placeholder='Your email' 
                type="email" 
                name="user_email" 
                required
              />
            </div>
            <div className='login-input'>
              <textarea 
                placeholder='Message' 
                name="message" 
                required/>
            </div>
            <button className='button' type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};
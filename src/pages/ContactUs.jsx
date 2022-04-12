/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Mynavbar2 from '../components/Mynavbar2';

export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY,
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log('Sucessfully Sent email');
        },
        (error) => {
          console.log(error.text);
        },
      );
  };

  return (
    <>
      <Mynavbar2 />
      <h1>{process.env.REACT_APP_YOUR_SERVICE_ID}</h1>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </>
  );
}

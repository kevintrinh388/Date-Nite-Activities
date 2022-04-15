/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

toast.configure();
export default function ContactUs(props) {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    props.handleClose();

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
          toast.success('Message Sent Successfully');
        },
        (error) => {
          console.log(error.text);
        },
      );
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Need help? Find a bug? Have a suggestion? Please leave a message here.</p>
        <Form ref={form} onSubmit={sendEmail}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="test"
              name="user_name"
              placeholder="Name"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Your Email address</Form.Label>
            <Form.Control
              type="email"
              name="user_email"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Your Message</Form.Label>
            <Form.Control as="textarea" name="message" rows={3} placeholder="Describe how we can help, what bug you've found, a feature you want us to include, or anything you want us to know" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={sendEmail}>
          Sumbit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

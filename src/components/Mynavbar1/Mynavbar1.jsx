import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Comp.css';
import log from 'loglevel';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Form, FormControl } from 'react-bootstrap';
import {
  IMAGE_KEY, PROFILE_KEY,
} from '../../constants/AuthConstants';
import RouteConstants from '../../constants/RouteConstants';
import ContactUs from '../../pages/ContactUs';

function Mynavbar1(props) {
  const { searchButton, userLocation } = props;

  const [profilePicture, setProfilePicture] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    try {
      const currentUserProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
      setProfilePicture(currentUserProfile[IMAGE_KEY]);
    } catch (e) {
      log.info('No profile picture found');
    }
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    searchButton();
  };

  return (
    <>
      <ContactUs handleShow={handleShow} show={show} handleClose={handleClose} />
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">DateNite</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link onClick={handleShow}>Contact Us</Nav.Link>
            </Nav>

            <Nav>
              <Navbar.Text data-test-id="navtext" className="navtext">Explore new places</Navbar.Text>
              <Form className="d-flex" onSubmit={searchHandler}>
                <FormControl
                  type="search"
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"
                  name="location"
                  defaultValue="Atlanta, GA"
                  onChange={(e) => {
                    userLocation.current = e.target.value;
                  }}
                />
              </Form>
              <NavDropdown
                title={(
                  <img
                    src={profilePicture}
                    className="rounded-circle z-depth-0"
                    alt="profile"
                    height="35"
                  />
            )}
                id="nav-dropdown-dark-example"
                align="end"
                menuVariant="dark"
              >
                <NavDropdown.Item href={RouteConstants.Profile}>Profile</NavDropdown.Item>
                <NavDropdown.Item href={RouteConstants.Dashboard}>Dashboard</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

Mynavbar1.propTypes = {
  userLocation: PropTypes.string.isRequired,
  searchButton: PropTypes.func.isRequired,
};

export default Mynavbar1;

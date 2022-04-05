import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Comp.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Form, FormControl } from 'react-bootstrap';

function Mynavbar(props) {
  const { searchButton, userLocation } = props;

  const searchHandler = (e) => {
    e.preventDefault();
    searchButton();
  };

  return (
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
            <Nav.Link href="#action2">Link</Nav.Link>
          </Nav>

          <Nav>
            <Navbar.Text className="navtext">Explore new places</Navbar.Text>
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
              title="Profile"
              id="nav-dropdown-dark-example"
              align="end"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/profile">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                {' '}
                Edit Profile
                {' '}
              </NavDropdown.Item>

              <NavDropdown.Item href="#action5">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Mynavbar.propTypes = {
  userLocation: PropTypes.string.isRequired,
  searchButton: PropTypes.func.isRequired,
};

export default Mynavbar;

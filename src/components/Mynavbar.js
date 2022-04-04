import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Navbar  from 'react-bootstrap/Navbar';
import  NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { FormControl } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

export function Mynavbar(props) {

  const searchHandler = (e) => {
    e.preventDefault();
    props.searchButton();
  }
  
  return (
    <Navbar bg="dark" expand="lg" variant='dark'>
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
      <Navbar.Text>Explore new places</Navbar.Text>
      <Form className="d-flex" onSubmit={searchHandler}>
        <FormControl
          type="search"
          placeholder="Search..."
          className="me-2"
          aria-label="Search"
          name="location"
          defaultValue="Atlanta, GA"
          onChange={(e) => props.userLocation.current = e.target.value}
        />
      </Form>
      <Nav>
      <NavDropdown title="Profile" id="nav-dropdown-dark-example" align="end" menuVariant="dark">
          <NavDropdown.Item href="#action3">Dashboard</NavDropdown.Item>
          <NavDropdown.Item href="/profile"> Edit Profile </NavDropdown.Item>
          <NavDropdown.Item href="#action5">
            Logout
          </NavDropdown.Item>
        </NavDropdown>
        </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}
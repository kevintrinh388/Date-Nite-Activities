import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Comp.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Mynavbar2() {
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
          </Nav>

          <Nav>
            <NavDropdown
              title={(
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
                  className="rounded-circle z-depth-0"
                  alt="profile"
                  height="35"
                />
              )}
              id="nav-dropdown-dark-example"
              align="end"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>

              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Mynavbar2;

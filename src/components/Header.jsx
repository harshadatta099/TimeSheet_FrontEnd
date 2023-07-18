import React from 'react'
import  { Navbar,Container } from 'react-bootstrap';
import logo from '../assets/smbxlLogo.svg';
const Header = () => {
  return (
    <Navbar className="bg-body-tertiary" >
    <Container>
      <Navbar.Brand href="#home"><img src={logo} alt="image not found" /></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">Mark Otto</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header
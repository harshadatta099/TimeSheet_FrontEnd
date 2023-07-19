import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/smbxlLogo.svg';


const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('user', null);
    navigate("/");
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"><img src={logo} alt="image not found" /></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          
          <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

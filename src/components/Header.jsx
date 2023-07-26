import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/smbxlLogo.svg';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hideHeader = location.pathname === "/signup" || location.pathname === "/";

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('user', null);
    navigate("/");
  };

  const currentUserType = JSON.parse(localStorage.getItem('roleId'));

  if (hideHeader) {
    return null;
  }

  return (
   
      <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"><img src={logo} alt="image not found" /></Navbar.Brand>
        <Nav className="me-auto">
            {currentUserType === 1 && (
              <>
              <Nav.Link href="/user">User</Nav.Link>
              <Nav.Link href="/weekdata">WeekData</Nav.Link>
              <Nav.Link href="user/edit-delete">Edit</Nav.Link>

              </>
            )}
            {currentUserType === 2 && (<>
              <Nav.Link href="/hr/users">Home</Nav.Link>
              {/* <Nav.Link href="/weekdata">WeekData</Nav.Link> */}

            </>)}

           {
              currentUserType === 3 && (<>
              <Nav.Link href="/admin/data">Data</Nav.Link>
              <Nav.Link href="/admin/users">Users</Nav.Link>
            </>)
           }
          </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          
          <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
};

export default Header;

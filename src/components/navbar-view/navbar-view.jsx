import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

import './navbar-view.scss';

export function NavbarView() {
  const user = localStorage.getItem('user');

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  return (
    <Navbar variant="dark">
      <Navbar.Brand href="/">myFlix</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Movies</Nav.Link>
        <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
        <Button className="shadow-none" onClick={() => { onLoggedOut() }}>Logout</Button>
      </Nav>
    </Navbar>
  );
}

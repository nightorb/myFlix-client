import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

export function Navbar() {
  const user = localStorage.getItem('user');

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  return (
  <Navbar className="mb-5" bg="primary" variant="dark">
    <Navbar.Brand href="/">myFlix</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Movies</Nav.Link>
      <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
      <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
    </Nav>
  </Navbar>
  );
}
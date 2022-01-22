import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import './navbar-view.scss';

export function NavbarView() {
  const user = localStorage.getItem('user');

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand href="/">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <NavDropdown className="navbar-dropdown" title="Movies" href="/">
              <NavDropdown.Item href="/">Movies</NavDropdown.Item>
              <NavDropdown.Item href="/genres">Genres</NavDropdown.Item>
              <NavDropdown.Item href="/directors">Directors</NavDropdown.Item>
              <NavDropdown.Item href="/actors">Actors</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className="navbar-dropdown" title="Account" href="/">
              <NavDropdown.Item href={`/users/${user}`}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => { onLoggedOut() }}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

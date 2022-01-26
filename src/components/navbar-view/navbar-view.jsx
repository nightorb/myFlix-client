import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import './navbar-view.scss';

export function NavbarView({visibilityFilter}) {
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

        <Navbar.Collapse >
          <Nav className="align-items-md-center me-auto">
            <NavDropdown className="navbar-dropdown" title="Movies" href="/">
              <NavDropdown.Item href="/">Movies</NavDropdown.Item>
              <NavDropdown.Item href="/genres">Genres</NavDropdown.Item>
              <NavDropdown.Item href="/directors">Directors</NavDropdown.Item>
              <NavDropdown.Item href="/actors">Actors</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className="navbar-dropdown mb-3 mb-md-0" title="Account" href="/">
              <NavDropdown.Item href={`/users/${user}`}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => { onLoggedOut() }}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item className="justify-content-end d-flex d-md-none">
              <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>

        <Nav.Item className="nav-item-large justify-content-end d-none d-md-flex">
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Nav.Item>
      </Container>
    </Navbar>
  );
}

NavbarView.propTypes = {
  visibilityFilter: PropTypes.func 
}

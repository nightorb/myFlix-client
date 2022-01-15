import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Col, Form, Button, Card } from 'react-bootstrap';

export function RegistrationView() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://nightorbs-myflix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      console.log(response.data);
      window.open('/', '_self');
    })
    .catch(err => {
      console.log(err + 'error registering the user');
    });
  }

  return (
    <Col xs={9} md={6} xl={4}>
      <Card>
        <Card.Header className="text-center" as="h4">
          Create a free account
        </Card.Header>

        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter a username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password must be 8 or more characters"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email adress"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleRegister}>Sign up</Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted text-center">
          <Card.Text>
            Already have an account?
          </Card.Text>
          <Button href="/" variant="secondary">Login</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string
  })
};
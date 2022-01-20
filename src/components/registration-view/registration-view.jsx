import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Col, Form, Button, Card } from 'react-bootstrap';

import './registration-view.scss';

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
    <Col className="registration-view" xs={9} md={6} xl={4}>
      <Card className="registration-card">
        <Card.Header className="registration-card-hf text-center" as="h4">
          Create a free account
        </Card.Header>

        <Card.Body className="registration-card-b">
          <Form className="registration-form">
            <Form.Group className="registration-form mb-3" controlId="formUsername">
              <Form.Label className="registration-form-label">Username:</Form.Label>
              <Form.Control className="registration-form-input shadow-none"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter a username"
                required
              />
            </Form.Group>

            <Form.Group className="registration-form mb-3" controlId="formPassword">
              <Form.Label className="registration-form-label">Password:</Form.Label>
              <Form.Control className="registration-form-input shadow-none"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password must be 8 or more characters"
                required
              />
            </Form.Group>

            <Form.Group className="registration-form mb-3" controlId="formEmail">
              <Form.Label className="registration-form-label">Email:</Form.Label>
              <Form.Control className="registration-form-input shadow-none"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email adress"
                required
              />
            </Form.Group>

            <Form.Group className="registration-form mb-3" controlId="formBirthday">
              <Form.Label className="registration-form-label">Birthday:</Form.Label>
              <Form.Control className="registration-form-input shadow-none"
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Button className="button-primary" type="submit" onClick={handleRegister}>Sign up</Button>
          </Form>
        </Card.Body>

        <Card.Footer className="registration-card-hf text-center">
          <Card.Text className="muted-text">
            Already have an account?
          </Card.Text>
          <Button className="button-secondary shadow-none" href="/">Login</Button>
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
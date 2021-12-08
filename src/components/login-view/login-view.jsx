import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Col, Form, Button, Card } from 'react-bootstrap';

export function LoginView(props) {
  // empty string inside useState is initial value of login variable
  // current state of username empty string
  // the method setUsername updates username
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // send request to server for authentication
    axios.post('https://nightorbs-myflix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user');
    });
  };

  return (
    <Col xs={9} md={6}>
      <Card>
        <Card.Header className="text-center" as="h4">
          Log in to your account
        </Card.Header>

        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted text-center">
          <Card.Text>
            Don't have an account?
          </Card.Text>
          <Button variant="secondary">Sign up</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};
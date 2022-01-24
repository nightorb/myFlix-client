import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Col, Form, Button, Card } from 'react-bootstrap';

import './login-view.scss';

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
      props.onLoggedIn(response.data);
    })
    .catch(err => {
      console.log(err + 'no such user');
    });
  };

  return (
    <Col className="login-view" sm={10} md={8} lg={6} xl={5}>
      <Card className="login-card">
        <Card.Header className="login-card-hf text-center" as="h4">
          Log in to your account
        </Card.Header>

        <Card.Body className="login-card-b">
          <Form className="login-form">
            <Form.Group className="login-form mb-3" controlId="formUsername">
              <Form.Label className="login-form-label">Username:</Form.Label>
              <Form.Control className="login-form-input shadow-none"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </Form.Group>

            <Form.Group className="login-form mb-3" controlId="formPassword">
              <Form.Label className="login-form-label">Password:</Form.Label>
              <Form.Control className="login-form-input shadow-none"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </Form.Group>

            <Button className="button-primary" type="submit" onClick={handleSubmit}>Login</Button>
          </Form>
        </Card.Body>

        <Card.Footer className="login-card-hf text-center">
          <Card.Text className="muted-text">
            Don't have an account?
          </Card.Text>
          <Button className="button-secondary shadow-none" href="/register">Sign up</Button>
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
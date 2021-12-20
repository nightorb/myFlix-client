import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

export function ProfileView({ user, setUser, movies, onUpdatedUserInfo, onLoggedOut }) {
  // const [ user, setUser ] = useState('');

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ favoriteMovies, setFavoriteMovies ] = useState('');

  const token = localStorage.getItem('token');

  const updateUser = (e) => {
    e.preventDefault();
    axios.put('https://nightorbs-myflix.herokuapp.com/users/${user.Username}',
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log(response.data);
        setUser(response.data);
        window.open('/', '_self');
      })
      .catch(err => {
        console.log('error updating user information');
      });
  };

  const deleteUser = (e) => {
    axios.delete('https://nightorbs-myflix.herokuapp.com/users/${user.Username}', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      console.log(response.data);
      onLoggedOut();
    })
    .catch(err => {
      console.error(err);
    })
  }

  const removeFavorite = (id) => {
    axios.delete(`https://nightorbs-myflix.herokuapp.com/users/${user.Username}/movies/${_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return (
    <Row>
      <Col xs={12} sm={4}>
        <Card>
          <Card.Body>
            <h4>Your Info</h4>
            <div className="user-username">
              <span className="label">Username: </span>
              <span className="value">{user.Username}</span>
            </div>
            <div className="user-email">
              <span className="label">Email: </span>
              <span className="value">{user.Email}</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={8}>
        <Card>
          <Card.Header className="text-center" as="h4">
            Edit Profile
          </Card.Header>

          <Card.Body>
            <Form className="profile-form">
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter a new username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password must be 8 or more characters"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter a new email adress"
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

              <Button variant="primary" type="submit" onClick={updateUser}>Update</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>


      {/* <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMovies.map(({ ImagePath, Title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="favorite-movies">
                <Figure>
                  <Link to={`/movies/${movies._id}`}>
                    <Figure.Image src={ImagePath} alt={Title} />
                    <Figure.Caption>
                      {Title}
                    </Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="secondary" onClick={() => removeFavorite(_id)}>Remove from list</Button>
              </Col>
            )
          })}
        </Row>
      </Card.Body>
    </Card> */}

    </Row>
  );
}
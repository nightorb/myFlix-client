import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: []
    };
  }

  componentDidMount() {
    this.props.getUser()
    .then(response => {
      this.setState({
        user: response.data
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  updateUser(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.put(`https://nightorbs-myflix.herokuapp.com/users/${user.Username}`,
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        const data = response.data;

        this.setState({
          Username: data.Username,
          Password: data.Password,
          Email: data.Email,
          Birthday: data.Birthday
        });

        localStorage.setItem('user', data.Username);
        console.log(data);
        console.log(this.state.Username);
        alert('Profile updated')
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  deleteUser() {
    const confirmation = window.confirm('Are you sure you want to delete your account?');

    if (confirmation) {
      const token = localStorage.getItem('token');

      axios.delete(`https://nightorbs-myflix.herokuapp.com/users/${user.Username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        alert('Your account has been deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // window.location.pathname = '/';
        onLoggedOut();
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  removeFavorite(movie) {
    const token = localStorage.getItem('token');

    axios.delete(`https://nightorbs-myflix.herokuapp.com/users/${user.Username}/favorites/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      alert('Movie was removed');
      this.componentDidMount();
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { user } = this.state;

    if (user === null) {
      return 'Loading';
    }
    return (
      <div>
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
          <Button variant="primary" onClick={() => { onBackClick(); }}>Back</Button>
        </Col>
      </Row>

      <Row>
        <h3>Favorite Movies</h3>

        { favoriteMovies && favoriteMovies.map((movie) => {
          <Col key={movie._id}>
            <MovieCard movie={movie} />
          </Col>
        })}

        {/* <Card>
          <Card.Body>
            <Row>
              <h4>Favorite Movies</h4>
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
      </div>
    );
  }
}
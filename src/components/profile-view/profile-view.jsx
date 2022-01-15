import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.get(`https://nightorbs-myflix.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;

      this.setState({
        Username: data.Username,
        Password: data.Password,
        Email: data.Email,
        Birthday: data.Birthday,
        FavoriteMovies: data.FavoriteMovies
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  updateUser(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

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

        localStorage.setItem('user', data.Username); // or "this.state.Username"?
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
    this.setState({
      Username: value
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value
    });
    this.Birthday = value;
  }

  deleteUser() {
    const confirmation = window.confirm('Are you sure you want to delete your account?');

    if (confirmation) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      axios.delete(`https://nightorbs-myflix.herokuapp.com/users/${user.Username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert('Your account has been deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // window.location.pathname = '/';
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  removeFavorite(movie) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.delete(`https://nightorbs-myflix.herokuapp.com/users/${user.Username}/favorites/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert('Movie was removed');
      this.componentDidMount();
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { user, Username, Email, Birthday, FavoriteMovies } = this.state;
    const { movie, onBackClick } = this.props;

    if (user === null) return 'Loading';

    return (
      <div>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <h4>Your Info</h4>
              <div className="user-username">
                <span className="label">Username: </span>
                <span className="value">{Username}</span>
              </div>
              <div className="user-email">
                <span className="label">Email: </span>
                <span className="value">{Email}</span>
              </div>
              <div className="user-birthday">
                <span className="label">Birthday: </span>
                <span className="value">{Birthday}</span>
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
              <Form 
                className="profile-form"
                onSubmit={e => 
                  this.updateUser(
                    e,
                    this.Username,
                    this.Password,
                    this.Email,
                    this.Birthday
                  )
                }
              >
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="Username"
                    onChange={e => this.setUsername(e.target.value)}
                    placeholder="Enter a new username"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    onChange={e => this.setPassword(e.target.value)}
                    placeholder="Your password must be 8 or more characters"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    onChange={e => this.setEmail(e.target.value)}
                    placeholder="Enter a new email adress"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    name="Birthday"
                    onChange={e => this.setBirthday(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => this.updateUser()}>Update</Button>
              </Form>
            </Card.Body>
          </Card>
          <Button variant="primary" onClick={() => { onBackClick(); }}>Back</Button>
        </Col>
      </Row>

      <Row>
        <h3>Favorite Movies</h3>
          {FavoriteMovies.lenght === 0 && (
            <div>No favorite movies</div>
          )}
          {FavoriteMovies.lenght > 0 && FavoriteMovies.map(movieId => {
            movie.find(m => m._id === movieId)
            return (
              <Col key={movie._id}>
                <MovieCard movie={movie} />
              </Col>
            )
          })}
      </Row>
      </div>
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        ReleaseYear: PropTypes.string.isRequired
      })
    )
  }),
  getUser: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired
};

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
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
    this.props.getUser();
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
    const { onBackClick } = this.props;

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
                    value={Username}
                    onChange={e => this.setUsername(e.target.value)}
                    placeholder="Enter a new username"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={user.Password}
                    onChange={e => this.setPassword(e.target.value)}
                    placeholder="Your password must be 8 or more characters"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={Email}
                    onChange={e => this.setEmail(e.target.value)}
                    placeholder="Enter a new email adress"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={Birthday}
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

        { FavoriteMovies && FavoriteMovies.map((movie) => {
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

ProfileView.propTypes = {
  user: PropTypes.shape({
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
  }).isRequired,
  getUser: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired
};

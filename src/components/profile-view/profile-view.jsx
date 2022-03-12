import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

import { setUser, updateUser } from '../../actions/actions';

import './profile-view.scss';

class ProfileView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.get(`https://nightorbs-myflix.herokuapp.com/users/${user}/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;

      this.props.setUser({
        Username: data.Username,
        Email: data.Email,
        Birthday: data.Birthday,
        FavoriteMovies: data.FavoriteMovies
      });
    })
    .catch(err => {
      console.error(err);
    })
  }

  handleUpdate(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.put(`https://nightorbs-myflix.herokuapp.com/users/${user}`,
      this.props.user,
      console.log(this.props.user, ' inside handleUpdate'),
      { headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;

      this.props.setUser({
        Username: data.Username,
        Email: data.Email,
        Birthday: data.Birthday
      });
      const username = this.props.user.Username;

      localStorage.setItem('user', username);
      alert('Profile updated');
      window.location.pathname = `/users/${username}`;
    })
    .catch(err => {
      console.log(err);
    });
  }

  setUsername(value) {
    this.props.updateUser({
      Username: value
    });
  }

  setPassword(value) {
    this.props.updateUser({
      Password: value
    });
  }

  setEmail(value) {
    this.props.updateUser({
      Email: value
    });
  }

  setBirthday(value) {
    this.props.updateUser({
      Birthday: value
    });
  }

  deleteUser() {
    const confirmation = window.confirm('Are you sure you want to delete your account?');

    if (confirmation) {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      axios.delete(`https://nightorbs-myflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert('Your account has been deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.pathname = '/';
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  removeFavorite(movie) {
    const token = localStorage.getItem('token'),
      user = localStorage.getItem('user');

    axios.delete(`https://nightorbs-myflix.herokuapp.com/users/${user}/favorites/${movie._id}`, {
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
    const { Username, Email, Birthday, FavoriteMovies } = this.props.user || {};
    const { onBackClick } = this.props;
    console.log(this.props.user);

    if (Username === null) return 'Loading';

    return (
      <div className="profile-view">
        <Row className="justify-content-md-center mb-5">
          <Col md={10} lg={12}>
            <div className="profile-page mb-4">Your Profile</div>
          </Col>

          <div className="w-100" />

          <Col md={10} lg={6}>
            <Card className="info-card mb-4">
              <Card.Header  className="info-card-hf text-center" as="h4">
                Your Info
              </Card.Header>
              <Card.Body className="info-card-b">
              <div className="user-username mb-2 mb-md-3">
                <span className="label">Username: </span>
                <span className="value">{Username}</span>
              </div>
              <div className="user-email mb-2 mb-md-3">
                <span className="label">Email: </span>
                <span className="value">{Email}</span>
              </div>
              <div className="user-birthday mb-2 mb-md-3">
                <span className="label">Birthday: </span>
                <span className="value">{dayjs(Birthday).format('YYYY-MM-DD')}</span>
              </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={10} lg={6}>
            <Card className="update-card mb-5">
              <Card.Header className="update-card-hf text-center" as="h4">
                Edit Profile
              </Card.Header>

              <Card.Body className="update-card-b">
                <Form className="update-form" onSubmit={e => this.handleUpdate(e)}>
                  <Form.Group className="update-form mb-3" controlId="formUsername">
                    <Form.Label className="update-form-label">Username:</Form.Label>
                    <Form.Control className="update-form-input shadow-none"
                      type="text"
                      name="Username"
                      onChange={e => this.setUsername(e.target.value)}
                      placeholder="Enter a new username"
                    />
                  </Form.Group>

                  <Form.Group className="update-form mb-3" controlId="formPassword">
                    <Form.Label className="update-form-label">Password:</Form.Label>
                    <Form.Control className="update-form-input shadow-none"
                      type="password"
                      name="Password"
                      onChange={e => this.setPassword(e.target.value)}
                      placeholder="Your password must be 8 or more characters"
                    />
                  </Form.Group>

                  <Form.Group className="update-form mb-3" controlId="formEmail">
                    <Form.Label className="update-form-label">Email:</Form.Label>
                    <Form.Control className="update-form-input shadow-none"
                      type="email"
                      name="Email"
                      onChange={e => this.setEmail(e.target.value)}
                      placeholder="Enter a new email adress"
                    />
                  </Form.Group>

                  <Form.Group className="update-form mb-3" controlId="formBirthday">
                    <Form.Label className="update-form-label">Birthday:</Form.Label>
                    <Form.Control className="update-form-input shadow-none"
                      type="date"
                      name="Birthday"
                      onChange={e => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button className="button-primary" type="submit">Update</Button>
                </Form>
              </Card.Body>

              <Card.Footer className="update-card-hf text-center">
                <Card.Text className="muted-text">
                  Danger zone!<br/>
                  Once you delete your account, there is no going back.
                </Card.Text>
                <Button className="button-secondary" type="submit" onClick={() => this.deleteUser()}>Delete Account</Button>
              </Card.Footer>
            </Card>

            <Button className="button-primary" onClick={() => { onBackClick(); }}>Back</Button>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md={10} lg={12}>
            <div className="favorite-movies mb-4">Favorite Movies:</div>
          </Col>

          <div className="w-100" />

          { FavoriteMovies && FavoriteMovies.length === 0 && (
            <div className="muted-text">You have no favorite movies.</div>
          )}

          { FavoriteMovies && FavoriteMovies.map(movie => (
            <Col className="movie-card-container d-flex align-items-stretch mb-4 mb-md-5" sm={6} md={5} lg={4} xl={3} key={movie._id}>
              <Card className="movie-card mb-4" movie={movie}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                  <Card.Title className="text-truncate">{movie.Title}</Card.Title>
                  <Card.Text className="muted-text">{movie.ReleaseYear}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button className="button-primary shadow-none">More</Button>
                  </Link>
                  <div className="w-100" />
                  <Button className="button-secondary remove-favorite mt-4" value={movie._id} onClick={() => this.removeFavorite(movie)}>Remove Favorite</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        ReleaseYear: PropTypes.string.isRequired
      })
    )
  }),
  getUser: PropTypes.func,
  onBackClick: PropTypes.func,
  setUser: PropTypes.func,
  updateUser: PropTypes.func
};

const mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    },
    updateUser: (user) => {
      dispatch(updateUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);

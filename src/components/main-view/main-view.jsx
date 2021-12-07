import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col, Navbar, Nav, Button } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ActorView } from '../actor-view/actor-view';
import { ProfileView } from '../profile-view/profile-view';

class MainView extends React.Component {
  // constructor method creates the component
  constructor() {
    super();
    // initial state is set to null
    this.state = {
      movies: [],
      // by default no movie selected, so it shows movie list
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');

    // to persist user's login data
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    // fech movies from myFlix API
    axios.get('https://nightorbs-myflix.herokuapp.com/movies', {
      // make authenticated requests to API by passing bearer authorization in header of HTTP request
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      // assign result to state
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  // when user successfully logs in, this function updates user property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // when movie is clicked, this function updates state of selectedMovie property to that movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    // if there is no user, LoginView is rendered. if a user is logged in, user details are passed as a prop to LoginView
    if (!user) return (
      <Row className="justify-content-center">
        <Col xs={9} md={6}>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </Col>
      </Row>
    );

    // before movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Navbar className="mb-5" bg="primary" variant="dark">
          <Navbar.Brand href="#">myFlix</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#movies">Movies</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#logout">Logout</Nav.Link>
            <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Nav>
        </Navbar>

        <Row className="justify-content-center">
          {selectedMovie
          // if state of selectedMovie is not, that selected movie will be returned otherwise all movies will be returned
            ? (
              <Col md={8} lg={4}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={4} lg={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }} />
              </Col>
            ))
          }
        </Row>
      </div>
    );
  }
}

export default MainView;

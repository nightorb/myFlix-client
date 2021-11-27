import React from 'react';
import axios from 'axios';
import { Row, Col, Navbar, Nav } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

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
    // fetch movies from myFlix API
    axios.get('https://nightorbs-myflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // when movie is clicked, this function updates state of selectedMovie property to that movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // when user successfully registers
  onRegistration(register) {
    this.setState({
      register
    });
  }

  // when user successfully logs in, this function updates user property in state to that particular user
  onLoggedIn(user) {
    this.setState({
      user
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

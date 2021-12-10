import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
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

  render() {
    const { movies, user } = this.state;

    return (
      <div className="main-view">
        <Router>
          <Navbar className="mb-5" bg="primary" variant="dark">
            <Navbar.Brand href="#">myFlix</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#movies">Movies</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Link to={`/users/${user}`}>Profile</Link>
              <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
            </Nav>
          </Navbar>
          <Row className="justify-content-center">
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

              if (movies.length === 0) return <div className="main-view" />;

              return movies.map(m => (
                <Col md={4} lg={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />

              return <RegistrationView />
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

              if (movies.length === 0) return <div className="main-view" />;

              return (
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              )
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

              if (movies.length === 0) return <div className="main-view" />;

              return (
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              )
            }} />

            <Route path={`/users/${user}`} render={({ history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

              if (movies.length === 0) return <div className="main-view" />;

              return (
                <ProfileView user={user} onBackClick={() => history.goBack()} />
              )
            }} />
          </Row>
        </Router>
      </div>
    );
  }
}

export default MainView;

import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { NavbarView } from '../navbar-view/navbar-view.jsx';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ActorView } from '../actor-view/actor-view';
import { ProfileView } from '../profile-view/profile-view';
import { AllGenres } from '../all-genres/all-genres';
import { AllDirectors } from '../all-directors/all-directors';
import { AllActors } from '../all-actors/all-actors';

import './main-view.scss';

class MainView extends React.Component {
  // constructor method creates the component
  constructor() {
    super();
    // initial state is set to null
    this.state = {
      movies: [],
      genres: [],
      directors: [],
      actors: [],
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
      this.getGenres(accessToken);
      this.getDirectors(accessToken);
      this.getActors(accessToken);
    }
  }

  getMovies(token) {
    // fetch movies from myFlix API
    axios.get('https://nightorbs-myflix.herokuapp.com/movies', {
      // make authenticated requests to API by passing bearer authorization in header of HTTP request
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      // assign result to state
      this.setState({
        movies: response.data
      });
      // console.log(this.state.movies);
    })
    .catch(err => {
      console.log(err);
    });
  }

  getGenres(token) {
    axios.get('https://nightorbs-myflix.herokuapp.com/genres', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        genres: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  getDirectors(token) {
    axios.get('https://nightorbs-myflix.herokuapp.com/directors', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        directors: response.data
      });
      // console.log(this.state.directors);
    })
    .catch(err => {
      console.log(err);
    });
  }

  getActors(token) {
    axios.get('https://nightorbs-myflix.herokuapp.com/actors', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        actors: response.data
      });
      // console.log(this.state.actors);
    })
    .catch(err => {
      console.log(err);
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
    this.getGenres(authData);
    this.getDirectors(authData.token);
    this.getActors(authData);
  }

  render() {
    const { movies, genres, directors, actors, user } = this.state;

    return (
      <Router>
        <NavbarView />

        <Row className="main-view justify-content-center py-5 px-5">
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

            if (movies.length === 0) return <div className="main-view" />;

            return movies.map(m => (
              <Col className="movie-card-container d-flex align-items-stretch" sm={6} md={4} xl={3} key={m._id}>
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

            return <Col lg={10}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/genres" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

            if (movies.length === 0) return <div className="main-view" />;

            return genres.map(g => (
              <Col className="all-genres" sm={10} key={g._id}>
                <AllGenres genre={g} />
              </Col>
            ))
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

            if (movies.length === 0) return <div className="main-view" />;

            return (
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            )
          }} />

          <Route exact path="/directors" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

            if (movies.length === 0) return <div className="main-view" />;

            return directors.map(d => (
              <Col className="all-genres" sm={10} key={d._id}>
                <AllDirectors director={d} />
              </Col>
            ))
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

            if (movies.length === 0) return <div className="main-view" />;

            return (
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            )
          }} />

          <Route exact path="/actors" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

            if (movies.length === 0) return <div className="main-view" />;

            return actors.map(a => (
              <Col className="all-genres" sm={10} key={a._id}>
                <AllActors actor={a} />
              </Col>
            ))
          }} />

          <Route path="/actors/:name" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

            if (movies.length === 0) return <div className="main-view" />;

            return (
              <ActorView actor={movies.find(m => m.Actors.Name === match.params.name).Actors} onBackClick={() => history.goBack()} />
            )
          }} />

          <Route path={`/users/${user}`} render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

            if (movies.length === 0) return <div className="main-view" />;

            return (
              <ProfileView getUser={() => this.getUser() } onBackClick={() => history.goBack()} />
            )
          }} />
        </Row>
      </Router>
    );
  }
}

export default MainView;

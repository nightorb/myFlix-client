/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';

import { setMovies, setGenres, setDirectors, setActors, setUser } from '../../actions/actions.js';

import MoviesList from '../movies-list/movies-list';
import GenresList from '../genres-list/genres-list';
import DirectorsList from '../directors-list/directors-list';
import ActorsList from '../actors-list/actors-list';
import { NavbarView } from '../navbar-view/navbar-view.jsx';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import  MovieView  from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ActorView } from '../actor-view/actor-view';
import ProfileView from '../profile-view/profile-view';

import './main-view.scss';

class MainView extends React.Component {
  // constructor method creates the component
  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');

    // to persist user's login data
    if (accessToken !== null) {
      this.props.setUser({
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
      this.props.setMovies(response.data);
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
      this.props.setGenres(response.data);
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
      this.props.setDirectors(response.data);
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
      this.props.setActors(response.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // when user successfully logs in, this function updates user property in state to that particular user
  onLoggedIn(authData) {
    this.props.setUser({
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
    const { user, movies, genres, directors, actors } = this.props;

    return (
      <Router>
        <NavbarView />

        <Row className="main-view justify-content-center py-5 px-5">
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            if (movies.length === 0) return <Spinner animation="border" />;

            return <MoviesList movies={movies} />;
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />

            return <RegistrationView />
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            if (movies.length === 0) return <Spinner animation="border" />;

            return <Col lg={10}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/genres" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            if (movies.length === 0) return <Spinner animation="border" />;

            return <GenresList genres={genres} />
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            if (genres.length === 0) return <Spinner animation="border" />;

            return <Col md={10} lg={9}>
              <GenreView genre={genres.find(g => g.Name === match.params.name)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/directors" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            if (movies.length === 0) return <Spinner animation="border" />;

            return <DirectorsList directors={directors} />
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            if (directors.length === 0) return <Spinner animation="border" />;

            return <Col>
              <DirectorView director={directors.find(d => d.Name === match.params.name)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/actors" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            if (movies.length === 0) return <Spinner animation="border" />;

            return <ActorsList actors={actors} />
          }} />

          <Route path="/actors/:name" render={({ match, history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            if (actors.length === 0) return <Spinner animation="border" />;

            return <Col>
              <ActorView actor={actors.find(a => a.Name === match.params.name)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/users/:username" render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            if (movies.length === 0) return <div className="main-view" />;

            return <Col xs={12}>
              <ProfileView onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
    genres: state.genres,
    directors: state.directors,
    actors: state.actors,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setGenres, setDirectors, setActors, setUser })(MainView);

import React from 'react';
import axios from 'axios';

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

    // registration view
    // if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />;

    // login view with button to registration (button doesn't work yet)
    // if (!user) return (
    //   <div>
    //     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    //     <button type="button">Register</button>
    //   </div>
    // );

    // if there is no user, LoginView is rendered. if a user is logged in, user details are passed as a prop to LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // before movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
        // if state of selectedMovie is not, that selected movie will be returned otherwise all movies will be returned
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }} />
          ))
        }
      </div>
    );
  }
}

export default MainView;

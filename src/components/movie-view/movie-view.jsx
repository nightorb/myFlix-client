import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
  }

  addFavoriteMovie() {
    const token = localStorage.getItem('token'),
      user = localStorage.getItem('user');

    axios.post(`https://nightorbs-myflix.herokuapp.com/users/${user}/favorites/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
    .then(() => {
      alert('Movie added to your favorites');
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <Image src={movie.ImagePath} crossOrigin="anonymous" fluid />
        </div>

        <div className="movie-title">
          <span className="value">{movie.Title}</span>
        </div>

        <div className="movie-description">
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
        </div>

        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
        </div>

        <div className="movie-actors">
          <span className="label">Actors: </span>
          { movie.Actors.map((actor) => (
            <Link key={actor.Name} to={`/actors/${actor.Name}`}>{actor.Name}</Link> ))
            .reduce((prev, curr) => [ prev, ", ", curr ])
          }
        </div>

        <Button className="button-fav" value={movie._id} onClick={() => this.addFavoriteMovie(movie)}>Add to Favorites</Button>

        <Button className="button-back" onClick={() => { onBackClick(); }}>Back</Button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthYear: PropTypes.string.isRequired,
      Movies: PropTypes.array.isRequired
    }),
    Actors: PropTypes.arrayOf(
      PropTypes.shape({
        Name: PropTypes.string.isRequired,
        BirthYear: PropTypes.string.isRequired,
        Movies: PropTypes.array.isRequired
      })
    ),
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

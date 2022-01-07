import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
  }

  addFavoriteMovie() {
    const token = localStorage.getItem('token'),
      username = localStorage.getItem('user');

    axios.post(`https://nightorbs-myflix.herokuapp.com/users/${username}/favorites/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
    .then(response =>{
      alert('Movie added to your favorites');
    })
    .catch(err => {
      console.log(err);
    });
  };

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
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link>
        </div>

        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">{movie.Director.Name}</Button>
          </Link>
        </div>

        <div className="movie-actors">
          <span className="label">Actors: </span>
          { movie.Actors.map((actor) => (
            <Link key={actor.Name} to={`/actors/${actor.Name}`}>{actor.Name}</Link> ))
            .reduce((prev, curr) => [ prev, ", ", curr ])
          }
        </div>

        <Button variant="danger" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button>

        <Button variant="primary" onClick={() => { onBackClick(); }}>Back</Button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
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
      })),
    Featured: PropTypes.bool.isRequired
  }).isRequired
};

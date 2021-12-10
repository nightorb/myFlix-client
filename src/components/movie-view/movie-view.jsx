import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Col md={8} lg={4}>
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
            <Link to={`directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
            </Link>
          </div>
          <div className="movie-actors">
            <span className="label">Actors: </span>
            <Link to={`/actors/${movie.Actors.Name}`}>
              <Button variant="link">{movie.Actors.Name}</Button>
            </Link>
          </div>
          <Button variant="primary" onClick={() => { onBackClick(); }}>Back</Button>
        </div>
      </Col>
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

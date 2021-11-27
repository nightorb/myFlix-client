import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return(
      <Card className="mb-4">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button variant="link" onClick={() => onMovieClick(movie)}>More</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
    // ReleaseYear: PropTypes.string.isRequired,
    // Genre: PropTypes.shape({
    //   Name: PropTypes.string.isRequired,
    //   Description: PropTypes.string.isRequired
    // }),
    // Director: PropTypes.shape({
    //   Name: PropTypes.string.isRequired,
    //   Bio: PropTypes.string.isRequired,
    //   BirthYear: PropTypes.string.isRequired,
    //   Movies: PropTypes.array.isRequired
    // }),
    // Actors: PropTypes.shape({
    //   Name: PropTypes.string.isRequired,
    //   BirthYear: PropTypes.string.isRequired,
    //   Movies: PropTypes.array.isRequired
    // }),
    // Featured: PropTypes.bool.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

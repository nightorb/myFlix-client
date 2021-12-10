import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return(
      <Card className="mb-4">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.ReleaseYear}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">More</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
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

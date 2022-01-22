import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Button, Card } from 'react-bootstrap';

import './all-genres.scss';

export class AllGenres extends React.Component {

  render() {
    const { genre } = this.props;

    return (
      <Col md={8}>
        <Card className="movie-card mb-4">
          <Card.Body>
            <Card.Title>{genre.Name}</Card.Title>
            <Card.Text className="muted-text">{genre.Description}</Card.Text>
            <Link to={`/genres/${genre.Name}`}>
              <Button className="button-primary shadow-none">More</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

AllGenres.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};

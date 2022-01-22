import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Button, Card } from 'react-bootstrap';

import './all-directors.scss';

export class AllDirectors extends React.Component {

  render() {
    const { director } = this.props;

    return (
      <Col md={8}>
        <Card className="movie-card mb-4">
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text className="muted-text">{director.Bio}</Card.Text>
            <Link to={`/directors/${director.Name}`}>
              <Button className="button-primary shadow-none">More</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

AllDirectors.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  }).isRequired
};

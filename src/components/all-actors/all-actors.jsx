import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Button, Card } from 'react-bootstrap';

import './all-actors.scss';

export class AllActors extends React.Component {

  render() {
    const { actor } = this.props;

    return (
      <Col md={8}>
        <Card className="movie-card mb-4">
          <Card.Body>
            <Card.Title>{actor.Name}</Card.Title>
            <Card.Text className="muted-text">{actor.Bio}</Card.Text>
            <Link to={`/actors/${actor.Name}`}>
              <Button className="button-primary shadow-none">More</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

AllActors.propTypes = {
  actor: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  }).isRequired
};

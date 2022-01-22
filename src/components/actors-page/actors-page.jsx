import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './actors-page.scss';

export class ActorsPage extends React.Component {
  render() {
    const { actor } = this.props;

    return (
      <Card className="actor-card mb-4">
        <Card.Body>
          <Link to={`/actors/${actor.Name}`}>
            <Card.Title className="text-center m-0">{actor.Name}</Card.Title>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

ActorsPage.propTypes = {
  actor: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  }).isRequired
};

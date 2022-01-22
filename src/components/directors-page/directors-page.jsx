import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './directors-page.scss';

export class DirectorsPage extends React.Component {
  render() {
    const { director } = this.props;

    return (
      <Card className="director-card mb-4">
        <Card.Body>
          <Link to={`/directors/${director.Name}`}>
            <Card.Title className="text-center m-0">{director.Name}</Card.Title>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

DirectorsPage.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  }).isRequired
};

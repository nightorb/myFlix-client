import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './genres-page.scss';

export class GenresPage extends React.Component {
  render() {
    const { genre } = this.props;

    return (
      <Card className="genre-card mb-4">
        <Card.Body>
          <Link to={`/genres/${genre.Name}`}>
            <Card.Title className="text-center m-0">{genre.Name}</Card.Title>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

GenresPage.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};

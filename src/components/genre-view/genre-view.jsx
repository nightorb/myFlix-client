import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Image } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Col md={8} lg={4}>
        <div className="genre-view">
          <div className="genre-name">
            <span className="value">{genre.Name}</span>
          </div>
          <div className="genre-description">
            <span className="value">{genre.Description}</span>
          </div>
  
          <Button variant="primary" onClick={() => { onBackClick(); }}>Back</Button>
        </div>
      </Col>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};

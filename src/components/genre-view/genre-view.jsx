import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <div className="genre-name mb-4">{genre.Name}</div>
        <div className="genre-description mb-4 mb-md-5">{genre.Description}</div>
        <Button className="button-primary" onClick={() => { onBackClick(); }}>Back</Button>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

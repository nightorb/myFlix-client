import React from 'react';
import { Button, Image } from 'react-bootstrap';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <Image src={movie.ImagePath} crossOrigin="anonymous" fluid />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}

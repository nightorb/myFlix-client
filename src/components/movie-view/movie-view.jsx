import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Col md={8} lg={4}>
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
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">{movie.Genre.Name}</Button>
            </Link>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <Link to={`directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
            </Link>
          </div>
          <div className="movie-actors">
            <span className="label">Actors: </span>
            <Link to={`/actors/${movie.Actors.Name}`}>
              <Button variant="link">{movie.Actors.Name}</Button>
            </Link>
          </div>
          <Button variant="primary" onClick={() => { onBackClick(); }}>Back</Button>
        </div>
      </Col>
    );
  }
}

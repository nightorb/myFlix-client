import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

import './actor-view.scss';

export class ActorView extends React.Component {

  render() {
    const { actor, onBackClick } = this.props;

    return (
      <div className="actor-view">
        <Row className="justify-content-center">
          <Col md={10} lg={9}>
            <div className="actor-name mb-4">{actor.Name}</div>
            <div className="actor-birthyear mb-4">Birthyear: {actor.BirthYear}</div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="mb-3 mb-md-4" md={10} lg={9}>
            <div className="actor-movies">Movies:</div>
          </Col>

          <div className="w-100" />

          { actor.Movies.map(movie => (
            <Col className="movie-card-container d-flex align-items-stretch mb-4 mb-md-5" sm={6} md={5} lg={3} key={movie._id}>
              <MovieCard movie={movie.Movie} role={movie.Role} />
            </Col>
          ))}

          <div className="w-100" />

          <Col md={10} lg={9}>
            <Button className="button-primary" onClick={() => { onBackClick(); }}>Back</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

ActorView.propTypes = {
  actor: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    BirthYear: PropTypes.string.isRequired,
    Movies: PropTypes.arrayOf(
      PropTypes.shape({
        Movie: MovieCard.propTypes.movie,
        Role: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

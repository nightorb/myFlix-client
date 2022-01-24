import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="director-name mb-4">{director.Name}</div>
            <div className="director-bio mb-3">{director.Bio}</div>
            <div className="director-birthyear mb-4">Birthyear: {director.BirthYear}</div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="mb-3 mb-md-4" md={10} lg={8}>
            <div className="director-movies">Movies:</div>
          </Col>

          <div className="w-100" />

          { director.Movies.map(movie => (
            <Col className="movie-card-container d-flex align-items-stretch mb-4 mb-md-5" sm={6} md={5} lg={4} key={movie._id}>
              <MovieCard movie={movie} />
            </Col>
          ))}

          <div className="w-100" />

          <Col md={10} lg={8}>
            <Button className="button-primary" onClick={() => { onBackClick(); }}>Back</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    BirthYear: PropTypes.string.isRequired,
    Movies: PropTypes.arrayOf(
      PropTypes.shape({
        Movie: MovieCard.propTypes.isRequired
      })
    )
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

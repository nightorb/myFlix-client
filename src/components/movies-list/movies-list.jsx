import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <Col>
    <Row className="d-block w-100">
      <h1 className="page-title text-center mb-5">Movies</h1>
    </Row>

    <Row className="justify-content-center">
      {filteredMovies.map(m => (
        <Col className="movie-card-container d-flex align-items-stretch" sm={6} md={4} xl={3} key={m._id}>
          <MovieCard movie={m} />
        </Col>
      ))}
    </Row>
  </Col>;
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      filter: PropTypes.func
    })
  ),
  visibilityFilter: PropTypes.string
};

export default connect(mapStateToProps)(MoviesList);

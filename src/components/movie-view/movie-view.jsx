import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Image } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
  }

  addFavoriteMovie() {
    const token = localStorage.getItem('token'),
      user = localStorage.getItem('user');

    axios.post(`https://nightorbs-myflix.herokuapp.com/users/${user}/favorites/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
    .then(() => {
      alert('Movie added to your favorites');
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Row className="justify-content-sm-center">
          <Col className="mb-4" sm={9} md={12}>
            <div className="movie-title mb-2">{movie.Title}</div>
            <Button className="button-secondary" value={movie._id} onClick={() => this.addFavoriteMovie(movie)}>Add to Favorites</Button>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="movie-poster order-md-1 mb-3 mb-md-4" sm={9} md={6}>
            <Image className="rounded" src={movie.ImagePath} fluid />
          </Col>

          <Col className="align-self-center" xs={12} sm={9} md={6}>
            <div className="movie-description mb-3 mb-md-4">{movie.Description}</div>

            <div className="movie-genre mb-2 mb-md-3">
              <span className="label">Genre: </span>
              <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
            </div>

            <div className="movie-director mb-2 mb-md-3">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
            </div>

            <div className="movie-actors mb-4 mb-md-5">
              <span className="label">Actors: </span>
              { movie.Actors.map((actor) => (
                <Link key={actor._id} to={`/actors/${actor.Name}`}>{actor.Name}</Link> ))
                .reduce((prev, curr) => [ prev, ", ", curr ])
              }
            </div>

            <Button className="button-primary" onClick={() => { onBackClick(); }}>Back</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    Genre: PropTypes.object.isRequired,
    Director: PropTypes.object.isRequired,
    Actors: PropTypes.arrayOf(
      PropTypes.object.isRequired
    ),
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

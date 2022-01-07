import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';

export class DirectorView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Col md={8} lg={4}>
        <div className="director-view">
          <div className="director-name">
            <span className="value">{director.Name}</span>
          </div>

          <div className="director-bio">
            <span className="value">{director.Bio}</span>
          </div>

          <div className="director-birthyear">
            <span className="value">{director.BirthYear}</span>
          </div>

          <div className="director-movies">
            <span className="label">Movies: </span>
            { director.Movies.map((movie) => (
              <Link key={movie._id} to={`/movies/${movie._id}`}>{movie.Title}</Link> ))
              .reduce((prev, curr) => [ prev, ", ", curr ])
            }
         </div>

          <Button variant="primary" onClick={() => { onBackClick(); }}>Back</Button>
        </div>
      </Col>
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
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        ReleaseYear: PropTypes.string.isRequired
      }))
  }).isRequired
};

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

import './genres-list.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function GenresList(props) {
  const { genres, visibilityFilter } = props;
  let filteredGenres = genres;

  if (visibilityFilter !== '') {
    filteredGenres = genres.filter(g => g.Name.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!genres) return <div className="main-view" />;

  return <>
    <Row className="d-block w-100">
      <h1 className="page-title text-center mb-5">Genres</h1>
    </Row>

    <Row className="justify-content-center">
      {filteredGenres.map(g => (
        <Col className="genres-list" xs={12} lg={8} key={g.Name}>
          <Card className="genre-card mb-4" genre={g}>
            <Card.Body>
              <Link to={`/genres/${g.Name}`}>
                <Card.Title className="text-center m-0">{g.Name}</Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>;
}

GenresList.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      filter: PropTypes.func
    })
  ),
  visibilityFilter: PropTypes.string,
};

export default connect(mapStateToProps)(GenresList);

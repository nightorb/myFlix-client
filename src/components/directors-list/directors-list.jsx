import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

import './directors-list.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function DirectorsList(props) {
  const { directors, visibilityFilter } = props;
  let filteredDirectors = directors;

  if (visibilityFilter !== '') {
    filteredDirectors = directors.filter(d => d.Name.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!directors) return <div className="main-view" />;

  return <>
    <Row className="d-block w-100">
      <h1 className="page-title text-center mb-5">Directors</h1>
    </Row>

    <Row className="justify-content-center">
      {filteredDirectors.map(d => (
        <Col className="directors-list" xs={12} lg={8} key={d.Name}>
          <Card className="director-card mb-4" director={d}>
            <Card.Body>
              <Link to={`/directors/${d.Name}`}>
                <Card.Title className="text-center m-0">{d.Name}</Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>;
}

DirectorsList.propTypes = {
  directors: PropTypes.arrayOf(
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      filter: PropTypes.func
    })
  ),
  visibilityFilter: PropTypes.string
};

export default connect(mapStateToProps)(DirectorsList);

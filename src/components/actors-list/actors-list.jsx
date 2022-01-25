import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

import './actors-list.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function ActorsList(props) {
  const { actors, visibilityFilter } = props;
  let filteredActors = actors;

  if (visibilityFilter !== '') {
    filteredActors = actors.filter(a => a.Name.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!actors) return <div className="main-view" />;

  return <>
    <Row className="d-block w-100">
      <h1 className="page-title text-center mb-5">Actors</h1>
    </Row>

    <Row className="justify-content-center">
      {filteredActors.map(a => (
        <Col className="actors-list" xs={12} lg={8} key={a._id}>
          <Card className="actor-card mb-4" actor={a}>
            <Card.Body>
              <Link to={`/actors/${a.Name}`}>
                <Card.Title className="text-center m-0">{a.Name}</Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>;
}

ActorsList.propTypes = {
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      filter: PropTypes.func
    })
  ),
  visibilityFilter: PropTypes.string
};

export default connect(mapStateToProps)(ActorsList);

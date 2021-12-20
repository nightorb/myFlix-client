import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';

export class ActorView extends React.Component {
  render() {
    const { actor, onBackClick } = this.props;

    return (
      <Col md={8} lg={4}>
        <div className="actor-view">
          <div className="actor-name">
            <span className="value">{actor.Name}</span>
          </div>
          <div className="actor-birthyear">
            <span className="value">{actor.BirthYear}</span>
          </div>
          <div className="actor-movies">
            <span className="label">Movies: </span>
          </div>

          <Button variant="primary" onClick={() => { onBackClick(); }}>Back</Button>
        </div>
      </Col>
    );
  }
}

ActorView.propTypes = {
  actor: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    BirthYear: PropTypes.string.isRequired
  }).isRequired
};

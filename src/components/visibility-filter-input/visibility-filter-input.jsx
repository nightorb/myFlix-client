/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss';

function VisibilityFilterInput(props) {
  return <Form.Control className="filter-input shadow-none"
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="filter"
  />;
}

export default connect(null, { setFilter })(VisibilityFilterInput);
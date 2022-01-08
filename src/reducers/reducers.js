import { combinedReducers } from 'redux';
import { SET_MOVIES, SET_FILTER } from '../actions/actions';

function movies(state = [], action) {
  switch(action.type) {
    case SET_MOVIES:
      console.log('SET_MOVIES reducer reached');
      return action.value;

    default:
      return state;
  }
}

function visibilityFilter(state = '', action) {
  switch(action.type) {
    case SET_FILTER:
      return action.value;

    default:
      return state;
  }
}

const movieApp = combinedReducers({
  movies,
  visibilityFilter
});

export default movieApp;

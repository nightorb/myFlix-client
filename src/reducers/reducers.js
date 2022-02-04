import { combineReducers } from 'redux';
import { 
  SET_MOVIES,
  SET_GENRES,
  SET_DIRECTORS,
  SET_ACTORS,
  SET_FILTER,
  SET_USER,
  UPDATE_USER,
  ADD_FAVORITE
} from '../actions/actions';

function movies(state = [], action) {
  switch(action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function genres(state = [], action) {
  switch(action.type) {
    case SET_GENRES:
      return action.value;
    default:
      return state;
  }
}

function directors(state = [], action) {
  switch(action.type) {
    case SET_DIRECTORS:
      return action.value;
    default:
      return state;
  }
}

function actors(state = [], action) {
  switch(action.type) {
    case SET_ACTORS:
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

function user(state = null, action) {
  switch(action.type) {
    case SET_USER:
      return action.value;
    case UPDATE_USER:
      // takes state and action.value and combines them into a new object
      return {...state, ...action.value};
    default:
      return state;
  }
}

function addFavorite(state = [], action) {
  switch(action.type) {
    case ADD_FAVORITE:
      return {...state, ...action.value};
    default:
      return state;
  }
}

const movieApp = combineReducers({
  movies,
  genres,
  directors,
  actors,
  visibilityFilter,
  user,
  addFavorite
});

export default movieApp;

import { combineReducers } from 'redux';
import { 
  SET_MOVIES,
  SET_GENRES,
  SET_DIRECTORS,
  SET_ACTORS,
  SET_FILTER,
  SET_USER,
  UPDATE_USER,
  ADD_FAVORITE,
  REMOVE_FAVORITE
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
      return action.user;
    case UPDATE_USER:
      return {
        ...state,
        ...action.user
      };
    default:
      return state;
  }
}

function favoriteMovies(state = [], action) {
  switch(action.type) {
    case ADD_FAVORITE:
      return [
        ...state,
        action.movie
      ];
    case REMOVE_FAVORITE:
      return state.filter(movie => movie !== action.movie);
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
  favoriteMovies
});

export default movieApp;

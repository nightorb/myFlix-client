export const SET_MOVIES = 'SET_MOVIES';
export const SET_GENRES = 'SET_GENRES';
export const SET_DIRECTORS = 'SET_DIRECTORS';
export const SET_ACTORS = 'SET_ACTORS';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_FAVORITE = 'ADD_FAVORITE';

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value
  }
}

export function setGenres(value) {
  return {
    type: SET_GENRES,
    value
  }
}

export function setDirectors(value) {
  return {
    type: SET_DIRECTORS,
    value
  }
}

export function setActors(value) {
  return {
    type: SET_ACTORS,
    value
  }
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  }
}

export function setUser(value) {
  return {
    type: SET_USER,
    value
  }
}

export function updateUser(value) {
  return {
    type: UPDATE_USER,
    value
  }
}

export function addFavorite(value) {
  return {
    type: ADD_FAVORITE,
    value
  }
}

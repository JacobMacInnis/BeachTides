import { API_BASE_URL } from '../../config';

export const SET_LOCATION = 'SET_LOCATION';
export const setLocation = location => ({
  type: SET_LOCATION,
  location
});

export const SET_DATE = 'SET_DATE';
export const setDate = date => ({
  type: SET_DATE,
  date
});

export const GET_TIDES_REQUEST = 'GET_TIDES_REQUEST';
export const getTidesRequest = () => ({
  type: GET_TIDES_REQUEST
});

export const GET_TIDES_ERROR = 'GET_TIDES_ERROR';
export const getTidesError = error => ({
  type: GET_TIDES_ERROR,
  error
});

export const GET_TIDES_SUCCESS = 'GET_TIDES_SUCCESS';
export const getTidesSuccess = tideData => ({
  type: GET_TIDES_SUCCESS,
  tideData
});

export const getTides = (location, date) => dispatch => {
  dispatch(getTidesRequest());
  return fetch(`${API_BASE_URL}/location?location=${location}&date=${date}`)
  .then(res => {
      if (!res.ok) {
        return res.json().then(data => Promise.reject(data))
      }
      return res.json();
  })
  .then(tideData => {
    dispatch(getTidesSuccess(tideData));
  })
  .catch(error => {
    dispatch(getTidesError(error));
  });
}
import { AsyncStorage } from 'react-native';
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
  return AsyncStorage.getItem('TIDES')
  .then(localTideData => {
    console.log('tideData ==>', localTideData);
    if (localTideData !== null) {
      console.log(localTideData, 'LOCAL TIDE DATA')
      return dispatch(getTidesSuccess(localTideData));
    }
    console.log('AsyncStorage does not contain data');
  })
  .then(() => {
    console.log('Sending Request for Tides');
    return fetch(`${API_BASE_URL}/location?location=${location}&date=${date}`);
  })
  .then(res => {
      if (!res.ok) {
        console.log('Received Error');
        return res.json().then(data => Promise.reject(data))
      }
      console.log('Received Tides Response');
      return res.json();
  })
  .then(tideData => {
    const date = tideData.date;
    console.log(date, 'DATE')
    dispatch(getTidesSuccess(tideData));
    let tideObject = {
      tideData: [ 1, 2, 3 ]
    };
    tideObject = JSON.stringify(tideObject);
    return AsyncStorage.setItem('TIDES', tideObject);
  })
  .catch(error => {
    console.log('Received Error');
    dispatch(getTidesError(error));
  });
}
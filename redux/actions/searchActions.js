import { AsyncStorage } from 'react-native';
import { API_BASE_URL } from '../../config';
import states from '../../src/utils/states';
import moment from 'moment';

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

export const getTides = (location, date) => async dispatch => {
  dispatch(getTidesRequest());

  const asyncData = await retrieveData(date, location, dispatch);
  if (asyncData) {
    return dispatch(getTidesSuccess(asyncData));
  }
  try {

    let res = await fetchTides(location, date);
    let tideRes = await res.json();
    if (tideRes.status === 200 || res.status === 200) {
      console.log('geting results')
      const save = saveData(tideRes);

      if (save) {
        console.log('geting results', tideRes)
        return dispatch(getTidesSuccess(tideRes));
      }
    } 
  } catch (e) {
    console.log('Error getting tides', e);
    return dispatch(getTidesError(e));
  }
}

const retrieveData = async (date, location, dispatch) => {
  let alteredLocation = alterLocation(location, dispatch);
  try {
    const value = await AsyncStorage.getItem(alteredLocation);
    // key = 'Holliston, MA' or '01945'
    // {
    //  state: 'MA',
    //  city: 'Marblehead',
    //  today: '05 21 2019',
    //  todayTides: [{},{},{}],
    //  tomorrow: '05 22 2019',
    //  tomorrowTides: [{}.{},{},{}]
    //  tideData: [{},{},{},{},{}]
    // }
    if (value !== null) {
      let tides = JSON.parse(value);
      if(checkDates(date, tides, alteredLocation)) {
        return tides;
      } else {
        return;
      }
    }
  } catch (error) {
    return false;
  }
};

function alterLocation(location, dispatch) {
  if (/^\d+$/.test(location)) {
    if (/^\d{3,5}$/.test(location)) {
      return location;
    } else {
      return dispatch(getTidesError({ status: 400, message: 'Zip-Code must have minimum 3 digits and maximum 5 digits'}));
    }
  } else {
    if (location.indexOf(',') > -1) {
      let city = location.split(',')[0].trim();
      let state = location.split(',')[1].trim();
      city = city.toLowerCase()
        .split(' ')
        .map(letters => letters.charAt(0).toUpperCase() + letters.substring(1))
        .join(' ');
      if (state.length > 2) {
        state = state.toLowerCase();
        if (states.hasOwnProperty(state)) {
          state = states[state];
          filter.state = state;
        } else {
          return dispatch(getTidesError({ status: 400, message: 'State can not be found'}));
        }
      } else {
        state = state.toUpperCase().trim();
        return `${city}, ${state}`;
      }
    } else {
      return dispatch(getTidesError({ status: 400, message: 'City and State must be separated by a comma'}));
    }
  }
}

async function checkDates(date, tides, alteredLocation) {
  if (tides.today === date || tides.tomorrow === date) {
    return true;
  } else {
      await removeTides(tides.zip_code);
      await removeTides(`${tides.city}, ${tides.state}`);
      return false;
  }
}

async function fetchTides(location, date) {
  return await fetch(`${API_BASE_URL}/location?location=${location}&date=${date}`);
}

async function removeTides(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(exception) {
    return false;
  }
}

async function saveData(tideData) {
  try {
    let { tideData: tideArray, city, state, zip_code } = tideData;
    let today = moment(tideArray[0].date).format('MM DD YYYY');
    if (today !== moment().format('MM DD YYYY')) {
      return;
    }
    const tomorrow = moment().add(1, 'days').format('MM DD YYYY');
    let todayTides = [];
    let tomorrowTides = [];
    
    for (let i = 0; i < tideArray.length; i++) {
      if (tideArray[i].date === today) {
        todayTides.push(tideObj);
      } else if (tideArray[i].date === tomorrow) {
        tomorrowTides.push(tideObj);
      }
    }
    const tideDataObject = {
      city,
      state,
      zip_code,
      today,
      todayTides,
      tomorrow,
      tomorrowTides,
      tideData: tideArray
    };
    const asyncData = JSON.stringify(tideDataObject);
    const storeCity = storeData(`${city}, ${state}`, asyncData);
    if (storeCity) {
      const storeZip = storeData(zip_code, asyncData);
      if (storeZip) {
        return true
      }
      else return false;
    }
    else return false;
  } catch(e) {
    return false;
  }
}

const storeData = async (setString, jsonData) => {
  try {
    const save = await AsyncStorage.setItem(setString, jsonData);
    if (save) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export function clearAllTides() {

}

// {
//   "city": "Marblehead",
//   "date": "05 21 2019",
//   "state": "MA",
//   "tideData": Array [
//      {
//       "date": "2019-05-21T05:38+0000",
//       "dt": 1558417103,
//       "height": 1.711,
//       "type": "High",
//     },
//     {
//       "date": "2019-05-21T12:19+0000",
//       "dt": 1558441186,
//       "height": -1.67,
//       "type": "Low",
//     },
//     {
//       "date": "2019-05-21T18:20+0000",
//       "dt": 1558462821,
//       "height": 1.305,
//       "type": "High",
//     },
//     {
//       "date": "2019-05-22T00:25+0000",
//       "dt": 1558484700,
//       "height": -1.257,
//       "type": "Low",
//     },
//     {
//       "date": "2019-05-22T06:21+0000",
//       "dt": 1558506076,
//       "height": 1.609,
//       "type": "High",
//     },
//     {
//       "date": "2019-05-22T13:03+0000",
//       "dt": 1558530218,
//       "height": -1.572,
//       "type": "Low",
//     },
//     {
//       "date": "2019-05-22T19:06+0000",
//       "dt": 1558551973,
//       "height": 1.217,
//       "type": "High",
//     },
//     Object {
//       "date": "2019-05-23T01:09+0000",
//       "dt": 1558573742,
//       "height": -1.161,
//       "type": "Low",
//     },
//   ],
// }
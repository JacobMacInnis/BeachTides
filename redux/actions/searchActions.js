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

function buildAsyncSearchString(date, location) {
  if (/^\d+$/.test(location)) {
    return `${date}_${location}`;
  } else {
    let city = location.split(',')[0];
    city = city.trim();
    city = city
        .toLowerCase()
        .split(' ')
        .map(letters => letters.charAt(0).toUpperCase() + letters.substring(1))
        .join(' ');
    let state = location.split(',')[1];
    state = state.trim().toUpperCase();
    return `${date}_${location}`;
  }
}

async function fetchTides(location, date) {
  return await fetch(`${API_BASE_URL}/location?location=${location}&date=${date}`);
}

const jsonify = async res => {
  try { 
    
    console.log(typeof res, 'trying')
    const newRes = res.json();
    console.log(newRes);
    return newRes;
  } catch(e) {
    console.log('unable to fucking make json')
    return false;
  }
}

// async function asyncStringify(data) {
//   return await JSON.stringify(data)
// }

async function setData(setString, jsonData) {
   await AsyncStorage.setItem(setString, jsonData);
}
const storeData = async (setString, jsonData) => {
  try {
    await AsyncStorage.setItem(setString, jsonData);
    return true;
  } catch (error) {
    return false;
  }
};

const retrieveData = async (string) => {
  try {
    const value = await AsyncStorage.getItem(string);
    if (value !== null) {
      console.log(JSON.parse(value))
      return value;
    }
  } catch (error) {
    return false;
  }
};

export const getTides = (location, date) => async dispatch => {
  dispatch(getTidesRequest());
  const fakeData = [
    {
      date: '2019-05-17T09:02+0000',
      dt: 1558083725,
      height: -1.697,
      type: 'Low',
    },
    {
      date: '2019-05-17T15:05+0000',
      dt: 1558105523,
      height: 1.516,
      type: 'High',
    },
      {
      date: '2019-05-17T21:20+0000',
      dt: 1558128011,
      height: -1.508,
      type: 'Low',
    }
  ];
  const asyncSearchString = await buildAsyncSearchString(date, location);

  const asyncData = await retrieveData(asyncSearchString);
  
  if (asyncData) {
    console.log(async, 'Got Async Data')
    return dispatch(getTidesSuccess(asyncSuccess));
  }

  console.log('No Data Locally, Requesting from server')
  try {
    let res = await fetchTides(location, date);
    
    let tideRes = await res.json();
    console.log(tideRes, 'this is Tide Res');  
    const save = saveData(tideRes);
    if (save) {
      return dispatch(getTidesSuccess(tideRes));
    }
  } catch (e) {
    getTidesError(e)
  }

  // const stringData = JSON.stringify(fakeData);

  // await storeData(asyncSearchString, stringData);
}
    //   console.log('AsyncStorage does not contain data');

    //   console.log('Sending Request for Tides');
    
      // tideRes = tideRes.json();
      // // if (tideRes)
      // console.log(tideRes);
      
      // if (res.status === 200) {
      //   console.log('Received Tides Response');
      //   res = res.json();
      //   // dispatch(getTidesSuccess(res));
      //   console.log(res, 'RES')
      //   let { date, city, state, tideData } = res;
      //   const location = `${city}, ${state}`;
      //   const asyncSearchString = buildAsyncSearchString(date, location);
      //   tideData = JSON.stringify(tideDate);
      //   console.log(asyncSearchString, 'SECOND STRING')
      //   const saveData = await AsyncStorage.setItem(asyncSearchString, tideData);
      //   if (saveData) {
      //     return;
      //   }
      // } else {
      //   res = res.json();
      //   console.log('Received Error', res);
      //   dispatch(getTidesError(res));
      // }

async function saveData(tideData) {
  try {
    let { tideData: tideArray, city, state } = tideData;
    let currentDate = tideArray[0].date;
    let tideDays = [];
    tideArray.map(tideObj => {
      if (tideObj.date === currentDate) {
        tideDays.push(tideOBJ);
      } else {
        currentDate = tideObj.date;
        const tideDate = moment(tideObj.date).format('MM DD YYYY');
        const asyncData = {
          city,
          state,
          date: day,
          tideData: tideDays
        };
        const store = storeData(tideDate, asyncData);
        if (store) {
          tideDays = [];
        }
      }
    });
    return true;
  } catch(e) {
    return false;
  }
}
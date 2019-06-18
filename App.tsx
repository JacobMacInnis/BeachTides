import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import Main from './Main';
import moment from 'moment';

const retrieveLastPurge = async () => {
  try {
    const value = await AsyncStorage.getItem('lastPurge');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    return false;
  }
 };

const saveLastPurge = async (todayDate) => {
  try {
    await AsyncStorage.setItem('lastPurge', todayDate);
    return true;
  } catch (error) {
    return false;
  }
};

async function monthlyClear() {
  const today = moment();
  const lastPurge = retrieveLastPurge();
  if (lastPurge) {
    if (moment().diff(lastPurge, 'days') >= 30) {
      await AsyncStorage.clear();
      return;  
    } else {
      return;
    }
  } else {
    await AsyncStorage.clear();
    const newPurge = saveLastPurge(today);
    if (newPurge) {
      return;
    }
  }
}

monthlyClear();
export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

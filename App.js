import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Main from './Main';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

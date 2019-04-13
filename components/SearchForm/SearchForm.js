import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Input from '../Input/input';
// import { connect } from 'react-redux';
// import { fetchLocation } from './../actions/index';

export class SearchForm extends React.Component {
  
  onSubmit(values) {
    const location = values.location || '';
    const date = values.date;
    return this.props.dispatch(
    fetchLocation(location, date))
  };

  render() {
    
    let searchError;
    if (this.props.searchError) {
      searchError = <div className="search-error">{this.props.searchError.message}</div>;
    }
    return (
      <View  onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <View>
          <Text>SEARCH TIDES</Text>
        </View>
        <View>{searchError}</View>
        <Field 
          component={Input}
          name='location'
          label='Please Enter Zipcode or City and State'
          placeholder='Zipcode OR City and State'
          />
        <Field 
          component={Input}
          name='date'
          type='date'
          label='Or Choose a Date'
          />
        <TouchableOpacity type='submit'>SUBMIT</TouchableOpacity>
      </View>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//   initialValues: { date: state.search.date },
//   tideData: state.search.tideData,
//   theme: state.theme.theme,
//   searchError: state.search.error
//   }
// }

// const searchForm = reduxForm({
//   form: 'search',
// })(SearchForm);

// export default connect(mapStateToProps)(searchForm)

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export class SearchForm extends React.Component {
  
  onSubmit(values) {
    const location = values.location || '';
    const date = values.date;
    return this.props.dispatch(
    fetchLocation(location, date))
  };

  render() {
    return (
      <View style={styles.searchFormContainer}>
        <View>
          <Text>SEARCH TIDES</Text>
        </View>
        <TouchableOpacity type='submit'><Text>SUBMIT</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchFormContainer: {
    flex: 1,
    height: hp('25%'),
    backgroundColor: 'white',
    alignItems: 'center',
  }
});

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { setDate } from '../../../redux/actions/searchActions';
import DatePicker from '../DatePicker/DatePicker';
import LocationInput from '../LocationInput/LocationInput';
import RF from "react-native-responsive-fontsize";

const mapStateToProps = state => {
  console.log(state);
  return {
    search: state
  }
}

export class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Zip or City, State',
      date: ''
    };
  }

  onSubmit(values) {
    const location = values.location || '';
    const date = values.date;
    return this.props.dispatch(
    fetchLocation(location, date))
  };

  render() {
    return (
      <View style={styles.searchFormContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 2, borderWidth: 1, opacity: 1, borderColor: 'black', backgroundColor: 'white', opacity: 1}}>
          <Text style={{ fontSize: RF(3), fontWeight: '700', }}>SEARCH TIDES</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1 }}>
          <Text style={{  }}>Please Enter Zip or City, State</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 3 }}> 
          <LocationInput />
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1 }}>
            <Text>Press To Change Date</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View>
          <DatePicker />
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 2 }}>
          <TouchableOpacity 
            style={{ borderColor: 'grey' }} type='submit'>
            <Text 
              style={{ 
                // fontSize: 21, 
                borderWidth: 2, 
                borderColor: 'grey', 
                borderRadius: 10,
                padding: 4,
                backgroundColor: 'white'
              }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchFormContainer: {
    flex: 1,
    borderRadius: 10,
    paddingTop: hp('2%'),
    width: wp('90%'),
    backgroundColor: 'white',
    opacity: .85,
    alignItems: 'center',
  }
});

const mapDispatchToProps = { setDate };

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
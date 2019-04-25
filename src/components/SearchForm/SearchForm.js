import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DatePicker from '../DatePicker/DatePicker';
import LocationInput from '../LocationInput/LocationInput';
import RF from "react-native-responsive-fontsize";
import { getTides } from '../../../redux/actions/searchActions';

const mapStateToProps = state => {
  const { location, date } = state.search;
  return {
    location,
    date
  };
};

export class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Zip or City, State',
      date: ''
    };
  }

  onSubmit() {
    const { dispatch, location, date } = this.props;
    return dispatch(getTides(location, date));
  };

  render() {
    console.log('SEARCHFORM', this.props.dispatch)
    return (
      <View style={styles.searchFormContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 2, backgroundColor: 'white', opacity: 1}}>
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
            style={{ borderColor: 'grey' }} 
            type='submit'
            onPress={() => this.onSubmit()}>
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

// function mapDispatchToProps(dispatch) { 
//   return {
//     getTides: () =>  dispatch({ type: getTides })
//   };
// };

const mapDispatchToProps = (dispatch) => {
  const boundActionCreators = bindActionCreators(getTides, dispatch);
  const allActionProps = {...boundActionCreators, dispatch}
  return allActionProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
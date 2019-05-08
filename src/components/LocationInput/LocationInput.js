import React from 'react';
import { TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { setLocation } from '../../../redux/actions/searchActions';

const mapStateToProps = state => {
  return {
    location: state.search.location
  };
}

export class LocationInput extends React.Component {
  
  setLocation(text) {
    return this.props.dispatch(setLocation(text));
  }

  render() {
    return (
      <TextInput style={{
        textAlign: 'center',
        width: wp('50%'),
        height: '100%',
        borderRadius: 6,
        fontSize: 18,
        backgroundColor: 'white', 
        borderColor: 'gray', 
        borderWidth: 1}}
        clearTextOnFocus={true}
        placeholder={'Zip or City, State'}
        onChangeText={(text) => this.setLocation(text)}
        value={this.props.location}>
      </TextInput>
    )
  }
}

export default connect(mapStateToProps)(LocationInput);
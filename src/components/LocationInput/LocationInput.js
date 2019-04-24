import React from 'react';
import { TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    location: state.search.location
  };
}

export class LocationInput extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Zip or City, State',
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
      <TextInput style={{
        textAlign: 'center',
        width: wp('40%'),
        height: '100%',
        borderRadius: 6,
        fontSize: 18,
        backgroundColor: 'white', 
        borderColor: 'gray', 
        borderWidth: 1}}
        clearTextOnFocus={true}
        placeholder={'Zip or City, State'}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}>
      </TextInput>
    )
  }
}

export default connect(mapStateToProps)(LocationInput);
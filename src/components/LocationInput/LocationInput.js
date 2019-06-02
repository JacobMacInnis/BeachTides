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
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      clearInput: false
    };
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.searchInput !== this.state.searchInput) {
      return this.state.searchInput;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    
    if (snapshot !== null) {
      const searchInput = this.state.searchInput;
      return this.props.dispatch(setLocation(searchInput));  
    }
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
        clearButtonMode="always"
        clearTextOnFocus={true}
        placeholder={'Zip or City, State'}
        // onChangeText={(text) => this.setLocation(text)}
        // value={this.props.location}>
        onChangeText={(searchInput)=>this.setState({
          searchInput
        })}
        value={!this.state.clearInput ? this.state.searchInput : null}
        onSubmitEditing={()=>{
          this.setState({
            clearInput:!this.state.clearInput,
          })
        }}
      >
      </TextInput>
    )
  }
}

export default connect(mapStateToProps)(LocationInput);
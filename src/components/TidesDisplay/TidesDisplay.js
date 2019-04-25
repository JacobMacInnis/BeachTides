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
  const { tidesData } = state.search;
  return {
    tidesData
  };
};

export class TidesDisplay extends React.Component {

  render() {
    const { tidesData } = this.props;
    console.log('TideData', tidesData)
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

const mapDispatchToProps = { setDate };

export default connect(mapStateToProps, mapDispatchToProps)(TidesDisplay);
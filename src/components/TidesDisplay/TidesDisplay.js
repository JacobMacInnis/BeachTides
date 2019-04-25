import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import RF from "react-native-responsive-fontsize";

const mapStateToProps = state => {
  const { tideData } = state.search;
  return {
    tideData
  };
};

export class TideDisplay extends React.Component {

  render() {
    const { tideData } = this.props;
    console.log('TideData', tideData)
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

export default connect(mapStateToProps)(TideDisplay);
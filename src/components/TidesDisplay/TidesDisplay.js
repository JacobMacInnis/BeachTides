import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import RF from "react-native-responsive-fontsize";
import moment from 'moment';

const mapStateToProps = state => {
  const { tideData } = state.search;
  return {
    tideData
  };
};

export class TideDisplay extends React.Component {

  render() {
    const { tideData } = this.props;
    let tideDisplay = null;
    if (tideData) {
      let date = moment(tideData.date, 'MM DD YYYY').format('MMMM Do, YYYY');
      tideDisplay = <View>
        <View><Text style={{ textAlign: 'center', fontSize: RF(3), color: "white"}}>{tideData.city}, {tideData.state}</Text></View>
        <View><Text style={{ textAlign: 'center', fontSize: RF(3), color: "white"}}>{date}</Text></View>
      </View>
    }
    return (
      <View style={styles.container}>
        {tideDisplay}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

export default connect(mapStateToProps)(TideDisplay);
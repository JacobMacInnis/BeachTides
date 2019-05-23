import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RF from "react-native-responsive-fontsize";
import moment from 'moment';
const uuid = require('uuid/v4');

const localDateTimeMachine = epoch => {
  const myDate = new Date( epoch * 1000 );
  return myDate.toLocaleString()
}

const mapStateToProps = state => {
  const { tideData, error } = state.search;
  return {
    tideData,
    error
  };
};

function makeTides(tideData) {
  const { location } = tideData;
  const tideArray = tideData.tideData;
  let currentDate = null;
  const groupedTides = [];
  for (let i = 0; i < tideArray.length; i++) {
    const tide = tideArray[i];
    
    const thisDate =  moment(localDateTimeMachine(tide.dt).split(',')[0], 'MM Do, YYYY').format('YYYY MM DD');
    if (currentDate === null || currentDate !== thisDate) {
      currentDate = thisDate;
      groupedTides.push([]);
    }
    groupedTides[groupedTides.length - 1].push(tide);
  }
  days = groupedTides.map((tidesArray, index) => {
    let day;
    day = localDateTimeMachine(tidesArray[0].dt).split(',')[0];
    day = moment(day,'MM DD YYYY').format('dddd, MMMM Do');
    return (
      <View 
        key={uuid()} 
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 4, 
          alignItems: 'center',
          justifyContent: 'center',
          height: hp('30%'),
          width: wp('85%'),
          marginBottom: hp('2%')
        }}
      >
        <Text 
          key={uuid()} 
          style={{ 
            fontSize: RF(4),
            fontWeight: '900',
            marginBottom: hp('1%')
          }}
        >{day}</Text>
        <View key={uuid()}>{tidesArray.map((tide, i) => {
          return <Text key={uuid()} style={{ fontSize: RF(3), marginBottom: hp('1%') }} >{tide.type} Tide at {moment(localDateTimeMachine(tide.dt).split(',')[1], 'h:mm a').format('h:mm a')}</Text>
        })
      }</View>
      </View>
    )
  });
  return days;
}

export class TideDisplay extends React.Component {

  render() {
    let { tideData, error } = this.props;
    let tideDisplay = null, tides = null;
    if (tideData) {
      const { city, state } = tideData;
      tides = makeTides(tideData);
      tideDisplay = <View>
        <View style={{ margin: hp('2%'), padding: hp('1%'), borderRadius: 6, backgroundColor: 'rgba( 255, 255, 255, 0.8)'}}>
          <Text style={{ textAlign: 'center', fontSize: RF(4), fontWeight: '900' }}>{city}, {state}</Text>
        </View>
        {tides}
      </View>
    } else if (error) {
      tideDisplay = <View style={{ margin: hp('4%'), padding: hp('1%'), borderRadius: 6, backgroundColor: 'rgba( 255, 255, 255, 0.8)'}}>
        <Text style={{ color: 'blue', textAlign: 'center', fontSize: RF(4), fontWeight: '900' }}>{error.message}</Text>
      </View>
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          {tideDisplay}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // backgroundColor: 'rgba(0,0,0,0.5)',
    // justifyContent: 'center',
    alignItems: 'center'
  }
});

export default connect(mapStateToProps)(TideDisplay);
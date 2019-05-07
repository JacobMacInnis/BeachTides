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

const localDateTimeMachine = epoch => {
  const myDate = new Date( epoch * 1000 );
  return myDate.toLocaleString()
}

const mapStateToProps = state => {
  const { tideData } = state.search;
  return {
    tideData
  };
};

export class TideDisplay extends React.Component {

  render() {
    let { tideData } = this.props;
    let tideDisplay = null;
    let tides = null;
    if (tideData) {
      const { city, state } = tideData;
       tides = tideData => {
        tideData = tideData.tideData;
        let currentDate = null;
        const groupedTides = [];
        for (let i = 0; i < tideData.length; i++) {
          const tide = tideData[i];
          
          const thisDate =  moment(localDateTimeMachine(tide.dt).split(',')[0], 'MM Do, YYYY').format('YYYY MM DD');
          if (currentDate === null || currentDate !== thisDate) {
            currentDate = thisDate;
            groupedTides.push([]);
          }
          groupedTides[groupedTides.length - 1].push(tide);
        } 
        return groupedTides.map((tidesArray, index) => {
          let day;
          day = localDateTimeMachine(tidesArray[0].dt).split(',')[0];
          day = moment(day,'MM DD YYYY').format('dddd, MMMM Do');
          return (
            <View>
              <Text>{day}</Text>
              <View>{tidesArray.map((tide, i) => {
                return <Text> key={i}>{tide.type} Tide at {moment(localDateTimeMachine(tide.dt).split(',')[1], 'h:mm a').format('h:mm a')}</Text>
              })
            }</View>
            </View>
          )
        })
      }
      // tideDisplay = <View>
      //   <View><Text style={{ textAlign: 'center', fontSize: RF(3), color: "white"}}>{city}, {state}</Text></View>
      //   {tides}
      // </View>
    }
    return (
      <View style={styles.container}>
        {tides}
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
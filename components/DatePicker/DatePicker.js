import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default class MyDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date: `${moment().format('MM DD YYYY')}`}
  }

  render(){
    return (
      <DatePicker
        style={{width: widthPercentageToDP('40%')}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="MM-DD-YYYY"
        minDate="01-01-2019"
        maxDate="12-31-2099"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            display: 'none',
            opacity: 0,
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            borderRadius: 10,
            backgroundColor: 'white',
          },
          dateText: {
            fontSize: 20,
            fontWeight: '400',
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}
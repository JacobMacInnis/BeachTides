import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { WebBrowser } from 'expo';

import Beach from '../assets/images/Beach.jpg';
import BeachTides from '../assets/images/BeachTides.png';
const window = Dimensions.get('window');
const imageDimensions = {
  height: window.height,
  width: window.width
}

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <Image style={[imageDimensions, {position: 'absolute'}]} source={Beach} />
        </View>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={BeachTides} />
          </View>
        </ScrollView>
      </View>
    );
  }
  
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    width: wp('90%'),
    // height: null,
    resizeMode: 'contain'
  }
});

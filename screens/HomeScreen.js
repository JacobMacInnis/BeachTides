import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar, 
} from 'react-native';
import { WebBrowser } from 'expo';
 import { MonoText } from '../src/components/StyledText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Beach from '../assets/images/Beach.jpg';
import BeachTides from '../assets/images/BeachTides.png';
import { SearchForm } from '../src/components/SearchForm/SearchForm';
import { DismissKeyboard } from '../src/components/DismissKeyboard/DismissKeyboard';
import KeyboardShift from '../src/components/KeyboardShift/KeyboardShift';


const window = Dimensions.get('window');
const imageDimensions = { height: window.height, width: window.width };
export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
  };
  
  render() {
    return (
      <KeyboardShift>
        {() => (
        <DismissKeyboard>
      <View style={{flex: 1}} >
        <View > 
          <View>
            <Image style={[imageDimensions, {position: 'absolute'}]} source={Beach} />
          </View>
        </View>
        <View style={styles.scrollView}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={BeachTides} />
            </View>
            <View style={styles.secondContainer}>
            </View>
            <View style={styles.searchContainer}>
              <SearchForm />
            </View>
            <View style={styles.bottomContainer}>
            </View>
          </View>
      </View>
      </DismissKeyboard>
        )}
      </KeyboardShift>
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
  scrollView: {
    flex: 1
  },  
  imageContainer: {
    flex: 5,
    height: hp('15%'),
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: hp('4%'),
    // paddingBottom: hp('1%')
  },
  image: {
    flex: 1,
    width: wp('90%'),
    resizeMode: 'contain'
  },
  secondContainer: {
    flex: 10,
    // backgroundColor: 'blue'
  },
  searchContainer: {
    flex: 10,
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 1
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
  contentContainer: {
      paddingTop: 30,
  },
  welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

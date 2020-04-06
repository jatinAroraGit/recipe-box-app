import * as React from 'react';
import firebase from '../configure/Firebase';
import {
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
  ImageBackground
} from 'react-native';
import TopNavbar from '../components/TopNavbar';
import LoginForm from '../components/LoginForm';
import { createPointerEventsContainer } from 'react-navigation-stack';
import Firebase from '../configure/Firebase';
import UserProfileScreen from './UserProfileScreen';

const baseStyle = StyleSheet.create({
  scrollViewBase: {
    //backgroundColor: '#C2185B',
    elevation: 5,
    margin: 8,
    marginBottom: 0,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderTopWidth: 6,
    //borderColor: 'transparent',
    // borderTopColor: '#EC407A',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
  }
});

var loggedIn = false;

class LoginScreen extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      navigation: this.props.navigation,
      loggedin: false
    }


  };
  componentDidMount() {

  }




  callbackFunction = (childData) => {

    
  };

  render() {

    if (false) {

      return (

        <UserProfileScreen ></UserProfileScreen>

      )
    } else {

      return (

        <SafeAreaView style={{ flex: 3, backgroundColor: '#FFFFFF' }}>
          <TopNavbar title='Log in'></TopNavbar>
          <ScrollView style={baseStyle.scrollViewBase}>
            <View style={{ marginStart: 10, marginTop: 20, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, overflow: "hidden" }}>

              <LoginForm props={this.props.navigation}></LoginForm>

            </View>
          </ScrollView>
        </SafeAreaView>
      )
    };
  }
}

LoginScreen.navigationOptions = {
  header: null,
};
export default LoginScreen;
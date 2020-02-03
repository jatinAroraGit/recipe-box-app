import * as React from 'react';
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
import { Button } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';

import Firebase from '../configure/Firebase';

const baseStyle = StyleSheet.create({
  scrollViewBase: {
    backgroundColor: '#263238',
    elevation: 5,
    margin: 8,
    marginBottom: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#EC407A',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }
});

class VerificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,

    }

    var user = Firebase.auth().currentUser;

    if(user) {

      if(!user.emailVerified) {
        user.sendEmailVerification().then(function() {
          console.log(' Email sent.');
      
        }).catch(function(error) {
          console.log(' Already Verified.');
          console.log(user.emailVerified);
        });
      }
    }
    

  }

  callbackFunction = (childData) => {
    this.setState({ login: childData });
    console.log("login complete!")
  }

  render() {

    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='Verification'></TopNavbar>
        <ScrollView style={baseStyle.scrollViewBase}>
          <View style={{ marginStart: 10, marginTop: 30, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>

            <Text style={{color: '#FFFFFF', fontSize: 14}}>Please check your email for a verification link.</Text>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

VerificationScreen.navigationOptions = {
  header: null,
};
export default VerificationScreen;
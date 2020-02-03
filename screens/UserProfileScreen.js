import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
import UserProfile from '../components/UserProfile';
import Firebase from '../configure/Firebase';
import VerificationScreen from './VerificationScreen';


const appbarCustom = StyleSheet.create({
  safeView: {
    ...Platform.select({
      ios: {
        padding: 30
      },
      android: {
        padding: 30
      }
    }),
  },
  transparentStyle: {
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
      },
      android: {
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
      },
      web: {
        backgroundColor: '#000000'
      }
    }),
  }
})
var verified = false;
class UserProfileScreen extends React.Component {
  
  constructor(props) {
    super(props);

    
    var user = Firebase.auth().currentUser;

    if(user) {

      verified = user.emailVerified;

    }


  }
  handleSubmitClick = (color) => {
    console.log('CLICKED %%%');
  }
  render() {

    if(!verified) {

      console.log("Unverified");
      console.log(verified);
      return (
        <VerificationScreen></VerificationScreen>
      )
    } else {

      console.log("Verified");
      console.log(verified);

    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='User Profile'></TopNavbar>
        <ScrollView >
          <View style={{ marginStart: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>

            <UserProfile props={this.props.navigation} ></UserProfile>

          </View>
        </ScrollView>
      </SafeAreaView>
    );


    }
  }
}

UserProfileScreen.navigationOptions = {
  header: null,
};
export default UserProfileScreen;
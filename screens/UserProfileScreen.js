import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
<<<<<<< HEAD
import UserProfile from '../components/UserProfile';
import Firebase from '../configure/Firebase';
import VerificationScreen from './VerificationScreen';

=======
import { useForm } from 'react-hook-form'
import UserProfileForm from './UserProfileForm';
import Firebase from '../configure/Firebase';
>>>>>>> Adds Code for logout

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
<<<<<<< HEAD
  
  constructor(props) {
    super(props);

    
    var user = Firebase.auth().currentUser;

    if(user) {

      verified = user.emailVerified;

    }


=======
  constructor(props) {
    super(props);

>>>>>>> Adds Code for logout
  }
  handleSubmitClick = (color) => {
    console.log('CLICKED %%%');
  }
  logoutUser = async () => {
    try {
      await Firebase.auth().signOut();
      // await Firebase.auth().currentUser.delete;
      // this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  render() {

<<<<<<< HEAD
    if(!verified) {

      console.log("Unverified");
      console.log(verified);
      return (
        <VerificationScreen props={this.props.navigation}></VerificationScreen>
      )
    } else {

      console.log("Verified");
      console.log(verified);

=======
    const { navigation } = this.props.navigation;
    console.log(navigation);
    console.log('NAVIGATION USER %%%%%%% ');
    console.log(this.props.navigation.state.routeName);
>>>>>>> Adds Code for logout
    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='User Profile'></TopNavbar>
        <ScrollView >
          <View style={{ marginStart: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>
<<<<<<< HEAD

            <UserProfile props={this.props.navigation} ></UserProfile>
=======

            <Text>User Profile Screen</Text>
            <UserProfileForm props={this.props.navigation} ></UserProfileForm>
            <Button onPress={this.logoutUser}>Log Out</Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );

>>>>>>> Adds Code for logout

          </View>
        </ScrollView>
      </SafeAreaView>
    );

<<<<<<< HEAD

    }
=======
>>>>>>> Adds Code for logout
  }
}

UserProfileScreen.navigationOptions = {
  header: null,
};
export default UserProfileScreen;
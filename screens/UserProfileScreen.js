import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
import { useForm } from 'react-hook-form'
import UserProfileForm from './UserProfileForm';
import UserProfile from '../components/UserProfile';


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

class UserProfileScreen extends React.Component {
  constructor(props) {
    super(props);

  }
  handleSubmitClick = (color) => {
    console.log('CLICKED %%%');
  }
  render() {

    /*console.log(navigation);
    console.log('NAVIGATION USER %%%%%%% ');
    console.log(this.props.navigation.state.routeName);*/
    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='User Profile'></TopNavbar>
        <ScrollView >
          <View style={{ marginStart: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>

            <UserProfile props={this.props.navigation} params={this.props.navigation.state.params}></UserProfile>

          </View>
        </ScrollView>
      </SafeAreaView>
    );



  }
}

UserProfileScreen.navigationOptions = {
  header: null,
};
export default UserProfileScreen;
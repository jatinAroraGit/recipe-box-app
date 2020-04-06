import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
import { useForm } from 'react-hook-form'
import UserProfileForm from './UserProfileForm';


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

class UserProfileFormScreen extends React.Component {
  constructor(props) {
    super(props);

  }
  handleSubmitClick = (color) => {
  }
  render() {

    const { navigation } = this.props.navigation;
    
    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='User Profile'></TopNavbar>
        <ScrollView >
          <View style={{ marginVertical: 20, marginStart: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>

            <UserProfileForm props={this.props.navigation} ></UserProfileForm>

          </View>
        </ScrollView>
      </SafeAreaView>
    );



  }
}

UserProfileFormScreen.navigationOptions = {
  header: null,
};
export default UserProfileFormScreen;
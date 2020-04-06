import * as React from 'react';
import { useState } from 'react';

import { View, StyleSheet, Platform, Text, Dimensions, FlatList } from 'react-native';
import { Button, TextInput, Title, Subheading, Avatar, Card, List, Snackbar, Banner } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import Firebase from '../configure/Firebase';
import SafeAreaView from 'react-native-safe-area-view';
//import Toast, { DURATION } from 'react-native-easy-toast'
//import Toast from 'react-native-root-toast';

const styles = StyleSheet.create({
  label: {
    color: '#FFFFFF',
    margin: 20,
    marginLeft: 0
  },
  button: {
    marginTop: 40,
    height: 20,
    backgroundColor: '#1DE9B6',
    borderRadius: 4
  },
  container: {
    flex: 1,
    //position: "relative",
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#263238',
    borderRadius: 10,
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 320
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,
      },
      android: {
        width: 320
      },
    })
  },
  innerContainer: {
    flex: 1,

    alignItems: 'center',
    paddingTop: 3,
    padding: 8,
    margin: 10,
    backgroundColor: '#F48FB1',
    borderRadius: 10,
    height: 'auto',
    shadowColor: "#D81B60",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.33,
    shadowRadius: 8.62,

    elevation: 8,

  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 30,
    padding: 5,
    borderRadius: 4,
  }
});



function UserProfile({ props, user }) {

  return (
    <SafeAreaView style={{ flex: 3 }}>
      
      <View style={styles.innerContainer}>
        <Title>Welcome, {user.displayName}</Title>
      </View>

      <View style={styles.innerContainer} >
        <Title>Account Settings</Title>
        <Button style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#64B5F6' }} mode="contained" onPress={() => props.navigate('ChangeEmail')}>
          Change Email
          </Button>
        <Button style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#64B5F6' }} mode="contained" onPress={() => props.navigate('ChangePassword')}>
          Change Password
          </Button>
        <Button style={{ marginHorizontal: 10, marginVertical: 20, backgroundColor: '#B71C1C' }} mode="contained" onPress={() => props.navigate('DeleteUser')}>
          Delete Account
          </Button>
      </View>
    </SafeAreaView>

  );


}
export default UserProfile;

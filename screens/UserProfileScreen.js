import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider } from 'react-native-paper';

import { DrawerActions }  from 'react-navigation-drawer';

import HomeScreen from "../screens/HomeScreen";
import { visible } from 'ansi-colors';
import Colors from '../constants/Colors';
import { withNavigation } from 'react-navigation';
import TopNavbar from '../components/TopNavbar';

const appbarCustom = StyleSheet.create({
  safeView: {
     ...Platform.select({
     ios: { padding: 30 
     },
      android: { padding: 30 
     }
    }), 
  },
  transparentStyle: {
     ...Platform.select({
     ios: { backgroundColor: 'rgba(52, 52, 52, 0.0)' 
     },
      android: { backgroundColor: 'rgba(52, 52, 52, 0.0)'
     },
     web:{
       backgroundColor: '#000000'
     }
    }), 
  }
})

class UserProfileScreen extends React.Component {
   constructor(props) {
    super(props);
   }
    
  render() {
const { navigation } = this.props.navigation;
console.log(navigation);
 console.log('NAVIGATION USER %%%%%%% ');
    console.log(this.props.navigation.state.routeName);
return (
  
  <View>
    <TopNavbar title='User Profile'></TopNavbar>
  <Text>User Profile Screen</Text>
  <Button onPress={() => this.props.navigation.navigate('Home')} >Click</Button>
  </View>
 );


  
  }
}

UserProfileScreen.navigationOptions = {
  header: null,
};
export default UserProfileScreen;
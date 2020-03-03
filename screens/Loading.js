import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, Image } from 'react-native'
import { Title } from 'react-native-paper'
import Firebase from '../configure/Firebase';
import { PulseIndicator } from 'react-native-indicators';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Loading extends React.Component {
  constructor(props) {
    console.log('LOAD -- ');
    super(props);
    Firebase.auth().onAuthStateChanged(user => {
      console.log('LOADING USER -- ')
      console.log(user);
      if (user) {
        if (user.emailVerified)
          this.props.navigation.navigate('Main');
        else
          this.props.navigation.navigate(NavigationActions.navigate({
            routeName: 'Main',
            action: NavigationActions.navigate({ routeName: 'UserProfile' }, { params: { verified: false } })
          }))
      }
      else
        this.props.navigation.navigate('Auth');
    })
  }
  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      console.log('STORING IN DB ^^^^^^^^^^^^^^^^');
      _storeData = async () => {
        try {
          await AsyncStorage.setItem(uid, user.email);
        } catch (error) {
          console.log(error);
        }
      };
      _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('uid');
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          console.log(error);
        }
      };

      //this.props.navigation.navigate(user && user.emailVerified ? 'Main' : 'Auth')

    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>

        <Image
          style={styles.logo}
          source={require('../assets/images/splash.png')}

        />
        <Title style={{ color: '#FFFFFF', fontSize: 30, position: "absolute" }}>RecipeBox</Title>

        <View style={{ flex: 1, position: "relative" }}>

          <PulseIndicator style={{ position: "relative" }} animating={true} size={180} color='#FF4081' />
        </View>

      </SafeAreaView >

    )
  }
}
Loading.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "column",

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#42A5F5',
  },
  logo: {
    position: "relative",
    width: 200,
    height: 300,

  },
})
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
import { Button, Title, Card } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';

import Firebase from '../configure/Firebase';
import { thisTypeAnnotation } from '@babel/types';
import { AuthSession } from 'expo';

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
  },
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
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    //backgroundColor: '#263238',
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
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 30,
    padding: 5,
    borderRadius: 4,
  }
});

class VerificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,

    }

    var user = Firebase.auth().currentUser;

    if (user) {

      if (!user.emailVerified) {
        user.sendEmailVerification().then(function () {
          console.log(' Email sent.');

        }).catch(function (error) {
          console.log(' Already Verified.');
          console.log(user.emailVerified);
        });
      }
    }


  }
  sendVerification = async () => {
    var user = await Firebase.auth().currentUser;
    if (!user.emailVerified) {
      user.sendEmailVerification().then(function () {

        console.log(' Email sent to : ' + user.email);

      }).catch(function (error) {
        console.log(' Already Verified.');
        console.log(user.emailVerified);
      });
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

          <View style={{ backgroundColor: '#FFF59D', width: 'auto', marginStart: 10, marginTop: 30, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden", alignSelf: 'center', padding: 15 }}>

            <Title style={{ color: '#00000', fontSize: 14 }}>Please check your email for a verification link.</Title>
            <Button onPress={this.sendVerification}>Send Verification Again </Button>

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
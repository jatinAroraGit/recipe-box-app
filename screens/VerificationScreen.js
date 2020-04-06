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
import { Button, Title, Card, Subheading, Snackbar, Banner } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
import { withNavigation, NavigationActions, StackActions } from 'react-navigation';

import Firebase from '../configure/Firebase';
import { thisTypeAnnotation } from '@babel/types';
import { AuthSession } from 'expo';

const styles = StyleSheet.create({
  nestedCardStyle: {
    flex: 1,
    margin: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    margin: 5,
    height: 200,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        width: 270
      },
      android: {
        width: 270,

      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 70) : 550,


      }

    }),
  }
});
class VerificationScreen extends React.Component {
  notifyMessage = "Oops!, something went wrong. Try again later.";
  constructor(props) {

    super(props);
    this.state = {
      showSnack: false,
      currentUser: null,
      message: "An email has been sent to ",
    }
  }


  logoutUser = async () => {
    try {
      await Firebase.auth().signOut();
      // await Firebase.auth().currentUser.delete;
      //this.setState({ user: null }); // Remember to remove the user from your app's state as well
      this.props.navigation.navigate('Login');
      /*
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login' })
        ]
      });
      this.props.navigation.dispatch(resetAction);
      */
    } catch (error) {
      console.error(error);
    }

  };

  toggleSnack = async () => {
    var user = await Firebase.auth().currentUser;
    this.setState({ showSnack: true, currentUser: user });
  }
  sendVerification = async () => {
    var user = await Firebase.auth().currentUser;

    if (!user.emailVerified) {
      //  l sentEmail = true;
      this.setState({ currentUser: user });
      user.sendEmailVerification().then(function () {
        // sentEmail = true;
        //this.setState({ currentUser: user });
        // this.notifyMessage = "A verification email has been sent to";
        // this.setState({ message: "A verification email has been sent to" });
        //this.setState

        // this.setState({ showSnack: true });


      }).catch(function (error) {
        //  sentEmail = true;
        //   this.setState({ message: "A verification email has been sent to" })
      });
      //  if (sentEmail) {
      //  this.setState({ message: "A verification email has been sent to" })
      //  this.notifyMessage = "A verification email has been sent to";
      //   this.setState({ currentUser: user });
      //  }

    }
    this.setState({ showSnack: true });
  }

  callbackFunction = (childData) => {
    this.setState({ login: childData });
  }

  render() {
    //backgroundColor: '#FFF9C4',
    return (

      <SafeAreaView style={{ flex: 3 }}>
        <Banner
          visible={this.state.showSnack}
          style={{ backgroundColor: '#FFEE58', borderRadius: 10, margin: 10 }}
          contentStyle={{ height: 'auto' }}
          icon='information'
          actions={[
            {
              label: 'CLOSE',
              onPress: () => { this.setState({ showSnack: false }) },
              mode: 'contained',

            }
          ]}

        >
          <Subheading>{this.state.message}</Subheading><Subheading style={{ color: '#E91E63' }}>{(this.state.currentUser) ? (this.state.currentUser.email) : ''}</Subheading>
        </Banner>
        <View style={{ flex: 3, width: 'auto', maxHeight: 400, marginStart: 10, marginTop: 20, marginEnd: 10, marginBottom: 90, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden", alignSelf: 'center', padding: 11 }}>
          <Card styles={styles.nestedCardStyle}>
            <Card.Title subtitleStyle={{ color: '#F9A825', fontSize: 20 }} subtitle="Information" />
            <Card.Content>
              <Title style={{ fontSize: 30 }}>Verification Required</Title>
              <Subheading style={{ fontSize: 20, color: '#000000', marginTop: 10 }}>You need to verify your account to proceed further</Subheading>
              <Subheading style={{ fontSize: 20, color: '#E91E63', marginTop: 10 }}>A verification email has been sent to your email.</Subheading>
            </Card.Content>
            <Card.Actions style={{ justifyContent: "center", marginTop: 10 }}>
              <Button mode='contained' onPress={this.sendVerification} >Send Verification Again </Button>
              <Button style={{ backgroundColor: '#E53935', margin: 5, position: 'relative' }} color='#FFFFFF' onPress={this.logoutUser}>Logout</Button>
            </Card.Actions>

          </Card>

        </View>


      </SafeAreaView >
    );
  }
}

VerificationScreen.navigationOptions = {
  header: null,
};
export default VerificationScreen;
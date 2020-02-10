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
import { Button, Title, Card, Subheading, Snackbar } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
import { withNavigation, NavigationActions } from 'react-navigation';

import Firebase from '../configure/Firebase';
import { thisTypeAnnotation } from '@babel/types';
import { AuthSession } from 'expo';

const styles = StyleSheet.create({
  nestedCardStyle: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    margin: 5,
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 270
      },
      android: {
        width: 270
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 70) : 550,


      }

    }),
  }
});

class VerificationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      showSnack: false,
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

  toggleSnack = () => {
    this.setState({ showSnack: true });
  }
  logoutUser = async () => {
    try {
      await Firebase.auth().signOut();
      // await Firebase.auth().currentUser.delete;
      //this.setState({ user: null }); // Remember to remove the user from your app's state as well
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  sendVerification = async () => {
    var user = await Firebase.auth().currentUser;
    if (!user.emailVerified) {
      user.sendEmailVerification().then(function () {
        this.setState({ showSnack: true });
        console.log(' Email sent to : ' + user.email);

      }).catch(function (error) {
        console.log(' Already Verified.');
        console.log(error);
      });
    }
  }

  callbackFunction = (childData) => {
    this.setState({ login: childData });
    console.log("login complete!")
  }

  render() {
    //backgroundColor: '#FFF9C4',
    return (

      <SafeAreaView style={{ flex: 1 }}>

        <View style={{ flex: 1, width: 'auto', marginStart: 10, marginTop: 20, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden", alignSelf: 'center', padding: 15 }}>
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
            <Snackbar
              visible={this.state.showSnack}
              onDismiss={() => this.setState({ showSnack: false })}
              duration={5000}
            >
              Email Sent
        </Snackbar>
          </Card>

        </View>


      </SafeAreaView>
    );
  }
}

VerificationScreen.navigationOptions = {
  header: null,
};
export default withNavigation(VerificationScreen);
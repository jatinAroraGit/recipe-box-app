<<<<<<< HEAD
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
import { Button } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';

import Firebase from '../configure/Firebase';

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
  }
});

class VerificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,

    }

    var user = Firebase.auth().currentUser;

    if(user) {

      if(!user.emailVerified) {
        user.sendEmailVerification().then(function() {
          console.log(' Email sent.');
      
        }).catch(function(error) {
          console.log(' Already Verified.');
          console.log(user.emailVerified);
        });
      }
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
          <View style={{ marginStart: 10, marginTop: 30, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>

            <Text style={{color: '#FFFFFF', fontSize: 14}}>Please check your email for a verification link.</Text>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

VerificationScreen.navigationOptions = {
  header: null,
};
=======
import * as React from 'react';
import firebase from '../configure/Firebase';
import { Avatar, Card, IconButton, Button, TextInput, Title, Subheading } from 'react-native-paper';
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
import TopNavbar from '../components/TopNavbar';
import LoginForm from '../components/LoginForm';

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
  }
});

class VerificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      sendAgain: false
    }

  };

  callbackFunction = (childData) => {
    this.setState({ login: childData });
    console.log("login complete!");
  };

  render() {
    let verifyCard;
    if (this.state.sendAgain) {
      verifyCard = <Card style={{ backgroundColor: '#FFCA28' }}>
        <Card.Content>
          <TextInput
            label='Email'
            style={{ margin: 10 }}
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <Button mode="contained" onPress={() => { }}>Send Verification </Button>
        </Card.Content>

      </Card>
    }
    else {
      verifyCard = <Card.Title titleStyle={{ color: '#FFFFFF' }}
        title="A verification Email has been sent to your account"
        subtitleStyle={{ fontSize: 20, color: '#FFFFFF' }}
        subtitle="Please verify your account to proceed further."
        left={(props) => <Avatar.Icon style={{ backgroundColor: '#FFCA28' }} size={80} icon="information-variant" color='#000000' />}

      />
    }
    console.log(this.state.navigation);
    //console.log('NAVIGATION USER %%%%%%% ');
    //console.log(this.props.navigation.state.routeName);
    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='Log in'></TopNavbar>
        <ScrollView style={baseStyle.scrollViewBase}>
          <View style={{ marginStart: 10, marginTop: 20, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>
            <Card style={{ marginStart: 10, marginTop: 20, marginEnd: 10 }}>

              <Card.Content>
                <Title>A verification Email has been sent to your account</Title>
                <Subheading>Please verify your account to proceed further. </Subheading>
                <TextInput
                  label='Email'
                  style={{ margin: 10 }}
                  value={this.state.text}
                  onChangeText={text => this.setState({ text })}
                />
                <Button mode="contained" onPress={() => { this.setState({ sendAgain: true }) }}>Send Verification Again </Button>
              </Card.Content>
            </Card>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

VerificationScreen.navigationOptions = {
  header: null,
};
>>>>>>> Adds boiler plate code for logout
export default VerificationScreen;
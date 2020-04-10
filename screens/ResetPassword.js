import * as React from 'react';
import { View, StyleSheet, Platform, SafeAreaView, ScrollView, Dimensions, Text } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import ResetPasswordForm from '../components/ResetPasswordForm';


class ResetPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,

    }
    let anyParam = this.props.navigation.state;
    console.log('ANY PARAM');
    console.log(anyParam);

  }

  callbackFunction = (childData) => {
    this.setState({ login: childData });
  }

  render() {

    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='Forgot Password'></TopNavbar>
        <ScrollView >
          <View style={{ marginStart: 10, marginTop: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>
            <ResetPasswordForm props={this.props.navigation}></ResetPasswordForm>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

ResetPasswordScreen.navigationOptions = {
  header: null,
};
export default ResetPasswordScreen;
import * as React from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import RegisterForm from '../components/RegisterForm';


class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,

    }
  }

  callbackFunction = (childData) => {
    this.setState({ login: childData });
    console.log("login complete!")
  }

  render() {

    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='Log in'></TopNavbar>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "position" : "position"} keyboardVerticalOffset={20} enabled>
          <ScrollView >

            <View style={{ marginStart: 10, marginTop: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>

              <RegisterForm props={this.props.navigation}></RegisterForm>

            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

RegisterScreen.navigationOptions = {
  header: null,
};
export default RegisterScreen;
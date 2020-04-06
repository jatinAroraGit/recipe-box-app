import * as React from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import RegisterForm from '../components/RegisterForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const baseStyle = StyleSheet.create({
  scrollViewBase: {
    elevation: 5,
    margin: 8,
    marginBottom: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 6,
    borderColor: 'transparent',
    borderTopColor: 'transparent',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }
});

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,

    }
  }

  callbackFunction = (childData) => {
    this.setState({ login: childData });
  }

  render() {

    return (

      <SafeAreaView style={{
        flex: 3,
      }}>
        <TopNavbar title='Register'></TopNavbar>
        <KeyboardAwareScrollView extraScrollHeight={Platform.OS === 'ios' ? 70 : 180} enableResetScrollToCoords={false} enableOnAndroid={true} o>

          <ScrollView style={baseStyle.scrollViewBase}>
            <View style={{ marginStart: 10, marginTop: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 10, marginBottom: 15, overflow: "hidden" }}>


              <RegisterForm nav={this.props.navigation}></RegisterForm>

            </View>

          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

RegisterScreen.navigationOptions = {
  header: null,
};
export default RegisterScreen;
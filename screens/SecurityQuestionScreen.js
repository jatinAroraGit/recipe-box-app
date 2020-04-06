import * as React from 'react';
import { View, StyleSheet, Platform, SafeAreaView, ScrollView, Dimensions, Text } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import SecurityQuestionForm from '../components/SecurityQuestionForm';


class SecurityQuestionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      registered: false
    }
  }

  callbackFunction = (childData) => {
    this.setState({ login: childData });
  }

  render() {

    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='Security Questions'></TopNavbar>
        <ScrollView >
          <View style={{ marginStart: 10, marginTop: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>

            <SecurityQuestionForm props={this.props.navigation}></SecurityQuestionForm>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

SecurityQuestionScreen.navigationOptions = {
  header: null,
};
export default SecurityQuestionScreen;
import * as React from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import DevForm from '../components/DevForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    borderTopColor: 'transparent',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }
});

class DevScreen extends React.Component {
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

    const { navigation } = this.props.navigation;
   // console.log(navigation);
    console.log('NAVIGATION USER %%%%%%% ');
    console.log(this.props.navigation.state.routeName);
    return (

      <SafeAreaView style={{ flex: 3, backgroundColor: '#1E88E5' }}>
        <TopNavbar title='Devscreen :o'></TopNavbar>
        <KeyboardAwareScrollView extraScrollHeight={Platform.OS === 'ios' ? 70 : 180} enableResetScrollToCoords={false} enableOnAndroid={true} >

          <ScrollView style={baseStyle.scrollViewBase}>
            <View style={{ marginStart: 10, marginTop: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>


              <DevForm props={this.props.navigation}></DevForm>

            </View>

          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

DevScreen.navigationOptions = {
  header: null,
};
export default DevScreen;
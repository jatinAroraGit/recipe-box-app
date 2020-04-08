import * as React from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import EditRecipeForm from '../components/EditRecipeForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const baseStyle = StyleSheet.create({
  scrollViewBase: {
    backgroundColor: '#81D4FA',
    elevation: 5,
    margin: 8,
    paddingBottom: 10,
    marginBottom: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 6,
    borderColor: 'transparent',
    borderTopColor: 'transparent',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  }
});

class EditRecipeScreen extends React.Component {
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

      <SafeAreaView style={{ flex: 3, backgroundColor: '#1E88E5' }}>
        <TopNavbar title='Recipe'></TopNavbar>
        <KeyboardAwareScrollView extraScrollHeight={Platform.OS === 'ios' ? 70 : 180} enableResetScrollToCoords={false} enableOnAndroid={true} >

          <ScrollView style={baseStyle.scrollViewBase}>
            <View style={{ marginStart: 10, marginTop: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>


              <EditRecipeForm nav={this.props.navigation}></EditRecipeForm>

            </View>

          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

EditRecipeScreen.navigationOptions = {
  header: null,
};
export default EditRecipeScreen;
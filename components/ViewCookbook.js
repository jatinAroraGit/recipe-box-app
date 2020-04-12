import * as React from 'react';
import { View, StyleSheet, Platform, SafeAreaView, ScrollView, Dimensions, Text, ImageBackground } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import UserItems from '../components/UserItems';
import ViewCookbookScreen from './ViewCookbookScreen';


class ViewCookbook extends React.Component {
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
      <ImageBackground source={require('../assets/images/Blush.jpg')} style={{ width: '100%', height: '100%', position: "relative" }} >
        <SafeAreaView style={{ flex: 3 }}>
          <TopNavbar title='View Cookbook'></TopNavbar>
          <ScrollView >
            <View style={{ marginStart: 10, marginTop: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>

              <ViewCookbookScreen props={this.props.navigation} cookbook={this.props.navigation.state.params.id}></ViewCookbookScreen>

            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

ViewCookbook.navigationOptions = {
  header: null,
};
export default ViewCookbook;
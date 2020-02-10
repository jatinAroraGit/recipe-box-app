import * as React from 'react';
import { View, StyleSheet, Platform, SafeAreaView, ScrollView, Dimensions, Text } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import SearchResults from '../components/SearchResults';


class SearchResultScreen extends React.Component {
   constructor(props) {
    super(props);
      this.state = {
        navigation: this.props.navigation,

      }
      console.log("SRSCREEN%%%%%%%")
    console.log(this.props.navigation.state)
   }

    callbackFunction = (childData) => {
        this.setState({login: childData});
        console.log("login complete!")
    }
  
  render() {
    
    console.log("SRSCREEN%%%%%%%")
    console.log(this.props.navigation)

    return (
  
      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='Log in'></TopNavbar>
        <ScrollView >
          <View style={{ marginStart:10, marginTop: 10, marginEnd:10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0 , justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden"}}>
            
              <SearchResults params={this.props.navigation.state.params} props={this.props.navigation}></SearchResults>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

SearchResultScreen.navigationOptions = {
  header: null,
};
export default SearchResultScreen;
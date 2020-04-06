import * as React from 'react';
import { View, SafeAreaView, ScrollView, Text, Button } from 'react-native';
//import { Button } from 'react-native-paper'
import TopNavbar from '../components/TopNavbar';
import ShoppingList from '../components/ShoppingList';


class ShoppingListScreen extends React.Component {
   constructor(props) {
    super(props);
      this.state = {
        navigation: this.props.navigation,

      }
   }

    callbackFunction = (childData) => {
        this.setState({login: childData});
    }

    
  
  render() {
    
    return (
  
      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='Shopping List'></TopNavbar>
        <ScrollView >
          <View style={{ marginStart:10, marginTop: 10, marginEnd:10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0 , justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden"}}>  
            <ShoppingList navigation={this.props.navigation} ingredSent={this.props.navigation.state.params}></ShoppingList>
          </View>
        </ScrollView> 
      </SafeAreaView>
    );
  }
}

ShoppingListScreen.navigationOptions = {
  header: null,
};
export default ShoppingListScreen;
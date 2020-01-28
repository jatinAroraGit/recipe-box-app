import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider, Subheading, Title } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import UserProfileForm from './UserProfileForm';
import '../configure/apiKey.json'


const appbarCustom = StyleSheet.create({
  safeView: {
     ...Platform.select({
     ios: { padding: 30 
     },
      android: { padding: 30 
     }
    }), 
  },
  transparentStyle: {
     ...Platform.select({
     ios: { backgroundColor: 'rgba(52, 52, 52, 0.0)' 
     },
      android: { backgroundColor: 'rgba(52, 52, 52, 0.0)'
     },
     web:{
       backgroundColor: '#000000'
     }
    }), 
  }
})

class DevScreen extends React.Component {
   constructor(props) {
    super(props);
   }
   state = {
     recipes : []
   }
componentDidMount() {
  this.fetchData(this.props.navigation.getParam('searchQuery'))
  }

  fetchData(query){
    let apiKey = require('../configure/apiKey.json');
    if(query){
      axios.get('https://api.spoonacular.com/recipes/search?apiKey='+apiKey.key+'&query='+query+'&number=40')
      .then(res => {
        const recipes = res.data.results;
        console.log(recipes)
        this.setState({recipes});
      })
    }
  }
  render() {
   
const { navigation } = this.props.navigation;
console.log(navigation);
 console.log('NAVIGATION USER %%%%%%% ');
    console.log(this.props.navigation.state.routeName);
return (
  
      <SafeAreaView style={{ flex: 3 }}>
 <TopNavbar title={this.props.navigation.state.routeName}></TopNavbar>
        <ScrollView >
  <View style={{ backgroundColor:'#81D4FA', marginStart:10, marginEnd:10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0 , justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden"}}>
  
  <Title style={{marginBottom:3}}>Results</Title>
   { this.state.recipes.map(r => <Text>{r.title}</Text>)}
     
    
  </View>
  </ScrollView>
  </SafeAreaView>
 );


  
  }
}

DevScreen.navigationOptions = {
  header: null,
};
export default DevScreen;
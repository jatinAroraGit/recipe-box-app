import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider, Subheading, Title } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import UserProfileForm from './UserProfileForm';
import '../configure/apiKey.json'

const baseStyle = StyleSheet.create({
  scrollViewBase: {
    //  backgroundColor: '#263238',
    elevation: 5,
    margin: 8,
    marginBottom: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#EC407A',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }
});
const appbarCustom = StyleSheet.create({
  safeView: {
    ...Platform.select({
      ios: {
        padding: 30
      },
      android: {
        padding: 30
      }
    }),
  },
  transparentStyle: {
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
      },
      android: {
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
      },
      web: {
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
    recipes: []
  }
  componentDidMount() {
    // this.props.searchQuery = this.props.navigation.getParam('searchQuery');
    this.fetchData(this.props.navigation.getParam('searchQuery'));


  }
  logoutUser = async () => {
    try {
      await Firebase.auth().signOut();
      // await Firebase.auth().currentUser.delete;
      this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
      // this.props.navigation.navigate('Login');
    } catch (error) {
    }
  };
  componentDidUpdate(prevProps) {
    this.fetchData(this.props.navigation.getParam('searchQuery'));
  }
  fetchData(query) {
    let apiKey = require('../configure/apiKey.json');
    if (query) {
      axios.get('https://api.spoonacular.com/recipes/search?apiKey=' + apiKey.key + '&query=' + query + '&number=40')
        .then(res => {
          const recipes = res.data.results;
          this.setState({ recipes });
        })
    }
  }
  render() {

    const { navigation } = this.props.navigation;
    return (

      <SafeAreaView style={{ flex: 3, backgroundColor: '#B2EBF2' }}>
        <TopNavbar title={this.props.navigation.state.routeName}></TopNavbar>
        <ScrollView style={baseStyle.scrollViewBase}>

          <ImageBackground source={require('../assets/images/multicolored_abstract.jpg')} style={{ flex: 3, width: '100%', height: '100%', position: "absolute" }}>


            <Title style={{ marginBottom: 3 }}>Results</Title>
            {this.state.recipes.map(r => <Text>{r.title}</Text>)}


          </ImageBackground>

        </ScrollView>
      </SafeAreaView>
    );



  }
}

DevScreen.navigationOptions = {
  header: null,
};
export default DevScreen;
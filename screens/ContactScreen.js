import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, Dimensions, Image } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider, Subheading, Title } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import * as MailComposer from 'expo-mail-composer';
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 'auto',
    width: "auto",
    ...Platform.select({
      ios: {
        width: 'auto'
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,
      },
      android: {
        width: 'auto'
      },
    })

  },
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

class ContactScreen extends React.Component {
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
  sendEmail(prevProps) {
    let recipient = ['prj666_201a04@myseneca.ca'];

    MailComposer.composeAsync({
      recipients: recipient
    });

  }
  render() {

    const { navigation } = this.props.navigation;
    return (

      <SafeAreaView style={{ flex: 2, backgroundColor: '#F48FB1' }}>
        <TopNavbar title={"Contact Us"}></TopNavbar>

        <View style={{ flex: 1, marginStart: 5, padding: 10, marginTop: 10, marginEnd: 5, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>

          <View style={baseStyle.container}>
            <Text style={{ fontSize: 18, margin: 10 }}>If you have any concerns with the app, want to know about future releases or just want to reach out to us we are available through email.</Text>
            <Title style={{ textAlign: "center", marginBottom: 3 }}>Send An Email To Our Team</Title>
            <Button style={{ backgroundColor: '#C2185B' }} mode="contained" onPress={() => this.sendEmail()}>Send An Email</Button>
            <Image source={require('../assets/images/splash.png')} style={{ width: 200, height: 200, position: "relative", alignSelf: "center" }}></Image>
            <Title style={{ textAlign: "center" }}>Recipe Box Team</Title>
            <Text style={{ textAlign: "center" }}> Jason Silvaroli </Text>
            <Text style={{ textAlign: "center" }}> Jatin Arora </Text>
            <Text style={{ textAlign: "center" }}> Patrick Keating </Text>
            <Text style={{ textAlign: "center" }}> Namra Fanse </Text>
            <Text style={{ textAlign: "center" }}> Sanghyuk Lee </Text>

          </View>

        </View>
      </SafeAreaView>
    );



  }
}

ContactScreen.navigationOptions = {
  header: null,
};
export default ContactScreen;
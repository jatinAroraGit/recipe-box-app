import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, ImageBackground, Image, FlatList } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider, ActivityIndicator, Title, Card, Headline, Surface, Subheading, DataTable } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
import UserProfile from '../components/UserProfile';
import Firebase from '../configure/Firebase';
import VerificationScreen from './VerificationScreen';
import { PulseIndicator } from 'react-native-indicators';
import { NavigationActions, StackActions } from 'react-navigation'
//import Svg, { Circle, Rect } from 'react-native-svg';
import Axios from 'axios';
const apiKey = require('../configure/apiKey.json');

const styles = StyleSheet.create({
  buttonOuterLayout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLayout: {
    marginBottom: 10
  }
});
const customStyles = StyleSheet.create({
  defaultRounded: {
    margin: 6,
    marginTop: 12,
    borderWidth: 0,
    borderRadius: 10,
    padding: 8,
    height: 'auto',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    backgroundColor: '#4FC3F7'
  },
  customStyle: {
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#81D4FA',
    margin: 18,
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 400
      },
      android: {
        width: 400
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,


      }
    }),
  },

  nestedCardStyle: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    margin: 5,
    flexWrap: 'wrap',
    alignItems: "flex-start",
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 270
      },
      android: {
        width: 270
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 70) : 550,


      }

    }),
  },
  viewBoxStyle: {
    marginTop: 10,
    backgroundColor: '#81D4FA',
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 0,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 300
      },
      android: {
        width: 300
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,


      }
    }),
  }
});


const viewChildrenStyle = StyleSheet.create({
  sameRow: {
    margin: 12,
    flexDirection: "row",
    justifyContent: "center"
    , alignItems: "center",
    alignSelf: "center"
  },

  sameColumn: {
    margin: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center"
  }
});


class UserHomeScreen extends React.Component {

  _isMounted = false;

  constructor(props) {

    super(props);
    this.state = { currentUser: [], isVerified: false, loading: true, items: [{}], tag: "" };
  }


  componentDidMount() {
    this.setState({ loading: true });
    this._isMounted = true;;
    const params = this.props.navigation.state;
    let set = this;
    this.unsubscribe = Firebase.auth().onAuthStateChanged(user => {

      if (user.emailVerified) {
        this.setState({ currentUser: user });
        if (user.emailVerified)
          set.setState({ currentUser: user });

        this.setState({ loading: false });
      }

    });

    this.unsubscribe();

  }
  componentDidUpdate() {
    //  this.setState({ loading: true })


  }

  componentWillUnmount() {
    this._isMounted = false;
    this.unsubscribe();
    //this.setState({ currentUser: null, isVerified: false, loading: true });
  }
  handleSubmitClick = (color) => {
  }
  logoutUser = async () => {
    try {
      await Firebase.auth().signOut();
      // await Firebase.auth().currentUser.delete;
      //this.setState({ user: null }); // Remember to remove the user from your app's state as well
      this.props.navigation.navigate('Auth');
      this.props.navigation.navigate('Login');
    } catch (error) {
    }
  };
  logoutUserOutOfStack = async () => {
    try {
      await Firebase.auth().signOut().then(() => {
        const resetAction = StackActions.replace({
          key: 'AuthHome',
          routeName: 'AuthHome',
          newKey: 'Login',
        });

        this.props.navigation.navigate('Login', "", StackActions.replace('AuthAccountStack'));
      });
      // await Firebase.auth().currentUser.delete;
      // this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
      // await Firebase.auth().currentUser.reload();
      // this.props.navigation.navigate('Auth');
      // this.props.navigation.navigate('Login');

      /*
      this.props.navigation.navigate(NavigationActions.navigate({
        routeName: 'Auth',
        action: NavigationActions.navigate({ routeName: 'Login' })
      }));
      */
    } catch (error) {
      console.error(error);
    }
  };



  toSaved() {

    var savedRecipes = [];

    var savedCookbooks = [];

    // GET SAVED COOKBOOKS HERE AND SET AS savedCookbooks
    // GET SAVED RECIPES HERE AND SET AS savedRecipes

    savedRecipes = [{ id: 749013, title: "Pasta", uri: "https://spoonacular.com/recipeImages/749013-312x231.jpeg" },
    { id: 549100, title: "Sweet Pork Taco Bowls", uri: "https://spoonacular.com/recipeImages/549100-312x231.jpg" },
    { id: 737543, title: "Chicken Pie", uri: "https://spoonacular.com/recipeImages/737543-312x231.jpeg" },
    { id: 499139, title: "Chicken Kiev", uri: "https://spoonacular.com/recipeImages/499139-312x231.jpg" }];
    // REMOVE ABOVE AFTER IMPLEMENTING API

    for (var i in savedRecipes) {

      savedRecipes[i] = JSON.stringify(savedRecipes[i]);

    }

    for (var i in savedCookbooks) {

      savedCookbooks[i] = JSON.stringify(savedCookbooks[i]);

    }

    this.props.navigation.navigate('UserItems', { recipes: savedRecipes, cookbooks: savedCookbooks });
  }

  render() {
    if (this.state.loading) {
      return (
        <SafeAreaView style={{ flex: 3 }}>

          <View style={{ marginStart: 10, marginEnd: 10, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>
            <PulseIndicator style={{ position: "absolute" }} animating={true} size={180} color='#F06292' />
            <Title style={{ position: "relative", padding: 10, color: "#FFFFFF" }}>Loading</Title>

          </View>

        </SafeAreaView>
      )
    }
    else {


      return (
        <ImageBackground source={require('../assets/images/Blush.jpg')} style={{ width: '100%', height: '100%', position: "relative" }} >
          <SafeAreaView style={{ flex: 3 }}>

            <TopNavbar title='Dashboard'></TopNavbar>

            <ScrollView >

              <View style={{ flex: 3, margin: '3%', marginBottom: "1%", marginStart: '5%', marginEnd: '5%', minHeight: 400, borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>
                { /*
              <ImageBackground source={require('../assets/images/DIMIGO.jpg')} style={{ width: '100%', height: '100%', position: "absolute" }} ></ImageBackground>
        */
                }
                <View style={{ position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                  <Headline style={{ color: 'white', marginTop: 25, fontSize: 30, fontWeight: "500", alignSelf: "flex-start" }}>Hey !</Headline>
                  <Headline style={{ alignSelf: "flex-start", fontSize: 26, color: "#FCE4EC", fontWeight: "500" }}>{this.state.currentUser.displayName}</Headline>
                  <Image source={require('../assets/images/cooking-stew-svgrepo-com.png')} style={{ width: 200, height: 200, position: "relative" }}></Image>

                  <Surface style={customStyles.defaultRounded}>
                    <Text onPress={() => this.props.navigation.push('UserProfile')} style={{ color: '#ffffff', fontSize: 20 }}>View User Profile</Text>
                  </Surface>
                  <Surface style={customStyles.defaultRounded}>
                    <Text onPress={() => { this.toSaved() }} style={{ color: '#ffffff', fontSize: 20 }}> View Your Saved Cookbooks and Recipes</Text>
                  </Surface>
                </View>

              </View>


            </ScrollView>
            <Button onPress={() => {
              this.props.navigation.navigate('Shopping');
            }}>Shopping</Button>
          </SafeAreaView>
        </ImageBackground>
      );



    }
  }
}

UserHomeScreen.navigationOptions = {
  header: null,
};
export default UserHomeScreen;
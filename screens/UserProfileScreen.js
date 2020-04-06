import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider, ActivityIndicator, Title, Card } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
import UserProfile from '../components/UserProfile';
import Firebase from '../configure/Firebase';
import VerificationScreen from './VerificationScreen';
import { PulseIndicator } from 'react-native-indicators';
import { NavigationActions, StackActions } from 'react-navigation'
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

const baseStyle = StyleSheet.create({
  viewBoxStyle: {
    marginTop: 10,
    backgroundColor: '#FFF59D',
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
  },
  scrollViewBase: {
    backgroundColor: '#263238',
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
  label: {
    color: '#FFFFFF',
    margin: 20,
    marginLeft: 0
  },
  button: {
    marginTop: 40,
    height: 20,
    backgroundColor: '#1DE9B6',
    borderRadius: 4
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    //backgroundColor: '#263238',
    borderRadius: 10,
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 320
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,
      },
      android: {
        width: 320
      },
    })
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 30,
    padding: 5,
    borderRadius: 4,
  }
});

var verified = false;

class UserProfileScreen extends React.Component {

  _isMounted = false;

  constructor(props) {

    super(props);
    this.state = { currentUser: [], isVerified: false, loading: true };

  }


  componentDidMount() {
    this._isMounted = true;
    const params = this.props.navigation.state;
    const isUserVerfied = params.verified;
    let set = this;
    this.unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      this.setState({ loading: false })
      if (user.emailVerified) {

        set.user = user;
        if (user.emailVerified)
          set.setState({ currentUser: user });


      }

    });

    this.unsubscribe();
    this.setState({ loading: false });
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
      console.error(error);
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

  render() {
    if (this.state.loading) {
      return (
        <SafeAreaView style={{ flex: 3 }}>

          <View style={{ marginStart: 10, marginEnd: 10, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>
            <PulseIndicator style={{ position: "absolute" }} animating={true} size={180} color='#2196F3' />
            <Title style={{ position: "relative" }}>Loading</Title>

          </View>

        </SafeAreaView>
      )
    }
    else {
      return (

        <SafeAreaView style={{ flex: 3 }}>
          <TopNavbar title='User Profile'></TopNavbar>
          <ScrollView style={{ flex: 3 }}>
            <View style={{ marginStart: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 10, overflow: "scroll" }}>
              <View style={{ flex: 1 }}>
                <UserProfile props={this.props.navigation} user={this.state.currentUser}></UserProfile>
              </View>
              <View style={{ flex: 1, marginBottom: 10 }}>
                <Button icon="logout-variant" style={{ backgroundColor: '#E53935', }} color='#FFFFFF' onPress={this.logoutUserOutOfStack}>Logout</Button>
              </View>
            </View>

          </ScrollView>


        </SafeAreaView>
      );



    }
  }
}

UserProfileScreen.navigationOptions = {
  header: null,
};
export default UserProfileScreen;
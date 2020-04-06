import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider, Searchbar } from 'react-native-paper';
import { DrawerActions } from 'react-navigation-drawer';
import { visible } from 'ansi-colors';
import Colors from '../constants/Colors';
import { withNavigation, NavigationActions } from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
import Firebase from '../configure/Firebase';


const appbarCustom = StyleSheet.create({

  transparentStyle: {
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent'
      },
      android: {
        backgroundColor: 'transparent',
      },
      web: {
        backgroundColor: '#000000',

      }

    }),
  }
})

const searchbarStyle = StyleSheet.create({
  default: {
    marginTop: 6,
    marginEnd: 4,
    marginStart: 4,
  },
});

class TopNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstQuery: '',
      show: false,
      userLoggedIn: (Firebase.auth().currentUser) ? true : false
    };
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

  thirdButtonFunction() {
  }
  handleSearch = (keyPress, query) => {
    // if(keyPress.nativeEvent.key=='Enter'){

    this.props.navigation.navigate('SearchResults', { searchQuery: query });
    //}
  };

  minimizeSearchBar = () => {
    this.setState({ show: false });
  }
  logoutUser = async () => {
    try {
      await Firebase.auth().signOut();
      // await Firebase.auth().currentUser.delete;
      // this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
      this.props.navigation.navigate('Login');
    } catch (error) {
    }
  };

  render() {
    const { firstQuery } = this.state;
    const { navigation } = this.props.navigation;
    let BackButton;
    if (this.props.navigation.dangerouslyGetParent().state.index > 0 && this.props.navigation.state.routeName != 'Login' && this.props.navigation.state.routeName != 'UserProfile' && this.props.navigation.state.routeName != 'Search') {
      BackButton = <Appbar.BackAction color='#FFFFFF' style={{ backgroundColor: '#000000', display: ((Platform.OS === 'web') ? 'none' : 'flex') }}
        onPress={() => this.props.navigation.goBack()}
      />
    }
    let ThirdButton;
    if (this.props.enableThirdButton) {
      if (false)//this.state.userLoggedIn)
        ThirdButton = <Appbar.Action color='#FFFFFF' icon={'logout-variant'} style={{ backgroundColor: '#000000' }
        } onPress={this.logoutUser} />//) ? this.props.customFunction : this.logoutUser} />
      else
        if (this.props.iconName) {
          ThirdButton = <Appbar.Action color='#FFFFFF' icon={(!this.state.userLoggedIn) ? this.props.iconName : 'logout-variant'} style={{ backgroundColor: '#000000' }
          } onPress={this.props.customFunction} />
        }
        else
          ThirdButton = <Appbar.Action color='#FFFFFF' icon='settings' style={{ backgroundColor: '#000000' }} onPress={() => { console.log('Pressed') }} />

    }
    return (
      <View>
        {this.state.show ? (


          <Appbar.Header style={appbarCustom.transparentStyle}>
            
              /*
            <Searchbar icon='window-minimize' onIconPress={() => { this.minimizeSearchBar() }} iconColor='#C62828' style={{ backgroundColor: '#F8BBD0', width: '100%' }}
              placeholder="Search by title"
              onChangeText={query => { this.setState({ firstQuery: query }); }}
              value={firstQuery}

              //onKeyPress={ (e) => this.handleSearch(e,firstQuery)}

              onSubmitEditing={(e) => this.handleSearch(e, firstQuery)}

            />
            
  }
          </Appbar.Header>

        ) : (
            <Appbar.Header style={appbarCustom.transparentStyle}>
              {BackButton}
              <Appbar.Content
                color='#000000'
                title={this.props.title}
                subtitle={this.props.subtitle}
              />
              {
              //<Appbar.Action icon="magnify" color='#FFFFFF' style={{ backgroundColor: '#000000' }} onPress={() => this.ShowHideComponent()} />
              }
              {ThirdButton}
            </Appbar.Header>
          )
        }

      </View>


    );
  }
}
function testFunc() {
  
}


/*
<View>
{this.state.show ? (
    <Image
      source={{
        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
      }}
      style={{ width: 100, height: 100 }}
    />
  ) : null}
  */
/*
<View>
<Provider>
<View
  style={{
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'center'
  }}>
  <Menu
    visible={this.state.visible}
    onDismiss={this._closeMenu}
    anchor={
      <Button onPress={this._openMenu}>Show menu</Button>
    }
  >
    <Menu.Item onPress={() => {}} title="Item 1" />
    <Menu.Item onPress={() => {}} title="Item 2" />
    <Divider />
    <Menu.Item onPress={() => {}} title="Item 3" />
  </Menu>
 
</View>
</Provider>
*/
export default withNavigation(TopNavbar);
import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider } from 'react-native-paper';

import { DrawerActions }  from 'react-navigation-drawer';

import HomeScreen from "../screens/HomeScreen";
import { visible } from 'ansi-colors';
import Colors from '../constants/Colors';

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

class TopNavbar extends React.Component {
   constructor(props) {
    super(props);
   }
    
  render() {
    let ThirdButton;
    if (this.props.enableThirdButton) {
    if(this.props.iconName)
    ThirdButton = <Appbar.Action icon={this.props.iconName} style={{backgroundColor:'#000000'}} onPress={ () => { console.log('Pressed') }}  />
    else
        ThirdButton = <Appbar.Action icon='settings' style={{backgroundColor:'#000000'}} onPress={ () => { console.log('Pressed') }}  />

    }
    return (
     
       <Appbar.Header style={appbarCustom.transparentStyle} >
          <Appbar.BackAction style={{backgroundColor:'#000000', display: ((Platform.OS==='web')? 'none': 'flex')}}   
            onPress={this._goBack}
          />
          <Appbar.Content color='#000000'
            title= {this.props.title}
            subtitle= {this.props.subtitle}
          />
          <Appbar.Action icon="magnify" style={{backgroundColor:'#000000'}} onPress={ () => { console.log('Pressed') }}  />
        {ThirdButton}
        </Appbar.Header>
   
    );
  }
}
     
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
     export default TopNavbar;
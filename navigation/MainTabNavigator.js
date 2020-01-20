import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';
//import {BottomNavigation} from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import DevScreen from '../screens/DevScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 14}}> Home </Text>,
  size: 30,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'home'}
    />
  ),
};

HomeStack.path = '';

const AccountStack = createStackNavigator(
  {
    Account: DevScreen,
  },
  config
);

AccountStack.navigationOptions = {
 tabBarLabel: <Text style={{ fontSize: 14}}> Account </Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'account'} />
  ),
};

AccountStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: DevScreen,
  },
  config
);

SearchStack.navigationOptions = {
 tabBarLabel: <Text style={{ fontSize: 14}}> Search </Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'magnify'} />
  ),
};

SearchStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 14}}> Settings </Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'settings'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createMaterialBottomTabNavigator({
  HomeStack,
  AccountStack,
  SearchStack,
  SettingsStack,
},{
  inactiveColor: '#BDBDBD',
  activeColor: '#FFFFFF',
  barStyle: {backgroundColor: "#EC407A"}
});

tabNavigator.path = '';
 export default tabNavigator;
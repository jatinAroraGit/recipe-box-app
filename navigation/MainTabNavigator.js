import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PageNotFound from '../screens/PageNotFound';
import UserProfileScreen from '../screens/UserProfileScreen';
import DevScreen from '../screens/DevScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    UserProfile: UserProfileScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 14 }}> Home </Text>,
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
    Account: PageNotFound,
  },
  config
);

AccountStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 14 }}> Account </Text>,
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
  tabBarLabel: <Text style={{ fontSize: 14 }}> Search </Text>,
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
  tabBarLabel: <Text style={{ fontSize: 14 }}> Settings </Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'settings'} />
  ),
};

SettingsStack.path = '';

const OptionsStack = createStackNavigator(
  {
    Options: PageNotFound,
  },
  config
);

OptionsStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 14 }}> Options </Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'camera-control'} />
  ),
};

OptionsStack.path = '';

const tabNavigator = createMaterialBottomTabNavigator({
  HomeStack,
  AccountStack,
  SearchStack,
  SettingsStack,
  OptionsStack
}, {
    inactiveColor: '#BDBDBD',
    activeColor: '#FFFFFF',
    barStyle: { backgroundColor: "#EC407A" }
  });

tabNavigator.path = '';
export default tabNavigator;
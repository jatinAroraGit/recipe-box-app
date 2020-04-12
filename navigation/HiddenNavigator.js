import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';

import ResetPasswordScreen from '../screens/ResetPassword';



const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HiddenStack = createStackNavigator(
  {
    ResetPass: ResetPasswordScreen

  },
  config
);

HiddenStack.navigationOptions = {

  tabBarLabel: <Text style={{ fontSize: 14 }}> Home </Text>,

  size: 30,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'home'}
    />

  ),
};

HiddenStack.path = '/resetPass';


const hiddenNavigator = createMaterialBottomTabNavigator({
  HiddenStack

}, {
    inactiveColor: '#37474F',
    activeColor: '#FFFFFF',
    barStyle: { backgroundColor: "#EC407A" },
    shifting: true,

  });

hiddenNavigator.path = '/resetXYX';
export default hiddenNavigator;
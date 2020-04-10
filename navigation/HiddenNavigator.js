import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PageNotFound from '../screens/PageNotFound';
import UserProfileFormScreen from '../screens/UserProfileFormScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SecurityQuestionScreen from '../screens/SecurityQuestionScreen';
import DevScreen from '../screens/DevScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchResults from '../components/SearchResults';
import VerificationScreen from '../screens/VerificationScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import ViewRecipe from '../components/ViewRecipe';
import ViewRecipeScreen from '../screens/ViewRecipeScreen';
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
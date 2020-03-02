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



const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
const AuthHomeStack = createStackNavigator(
  {
    AuthHome: HomeScreen,
    Features: PageNotFound
  },
  config
);
AuthHomeStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 14 }}> Home </Text>,
  size: 30,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'home'}
    />
  ),
  tabBarColor: '#EF5350'
};

AuthHomeStack.path = '';

const AuthAccountStack = createStackNavigator(

  {

    Login: (true) ? LoginScreen : VerificationScreen,
    Register: RegisterScreen,
    ForgotPassword: ForgotPasswordScreen,
    UserAccount: UserProfileFormScreen,
    SecurityQuestion: SecurityQuestionScreen,
    UserProfile: UserProfileScreen,
    // Verification: VerificationScreen,

  },
  config
);

AuthAccountStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 14 }}> Account </Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'account'} />
  ),
  tabBarColor: '#0097A7'
};

AuthAccountStack.path = '';
const AuthSearchStack = createStackNavigator(
  {
    SimpleSearch: SearchScreen,
    //Results: SearchResults,
    Results: SearchResultScreen,
    ViewRecipe: ViewRecipeScreen,
  },
  config
);

AuthSearchStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 14 }}> Search </Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'magnify'} />
  ),
  tabBarColor: '#4CAF50'
};

AuthSearchStack.path = '';
const authTabNavigator = createMaterialBottomTabNavigator({
  AuthHomeStack,
  AuthAccountStack,
  AuthSearchStack,
}, {
    inactiveColor: '#37474F',
    activeColor: '#FFFFFF',
    barStyle: { backgroundColor: "#EC407A" },
    shifting: true,
  });

authTabNavigator.path = '';
export default authTabNavigator;
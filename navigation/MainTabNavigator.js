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
import DeleteUserScreen from '../screens/DeleteUserScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';
import SecurityQuestionScreen from '../screens/SecurityQuestionScreen';
import ContactScreen from '../screens/ContactScreen';
import SearchScreen from '../screens/SearchScreen';
import VerificationScreen from '../screens/VerificationScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
//import ViewRecipe from '../components/ViewRecipe';

import Loading from '../screens/Loading';
import ViewRecipeScreen from '../screens/ViewRecipeScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import EditRecipeScreen from '../screens/EditRecipeScreen';
import UserItemsScreen from '../screens/UserItemsScreen';
import ViewCookbookScreen from '../components/ViewCookbookScreen';
import ViewCookbook from '../components/ViewCookbook';
import ViewBasic from '../components/ViewBasic';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


const HomeStack = createStackNavigator(
  {
    UserHomeScreen: UserHomeScreen,
    ViewRandomRecipe: ViewRecipeScreen,
    Shopping: ShoppingListScreen,
    UserItems: UserItemsScreen,
    EditRecipe: EditRecipeScreen,
    ViewBasicRecipe: ViewBasic,
    ViewCookbook: ViewCookbook


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

    UserProfile: UserProfileScreen,
    UserAccount: UserProfileFormScreen,
    ForgotPassword: ForgotPasswordScreen,

    SecurityQuestion: SecurityQuestionScreen,
    Verification: VerificationScreen,
    CreateCookbook: PageNotFound,
    ChangeEmail: ChangeEmailScreen,
    ChangePassword: ChangePasswordScreen,
    DeleteUser: DeleteUserScreen,

  },
  config
);

AccountStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 14 }}> Profile </Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'account'} />
  ),
};

AccountStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    Results: SearchResultScreen,
    Shopping: ShoppingListScreen,
    ViewAdvancedRecipe: ViewRecipeScreen

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
    ContactUs: ContactScreen
  },
  config
);

OptionsStack.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 14 }}> Options </Text>,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'help-box'} />
  ),
};

OptionsStack.path = '';

const tabNavigator = createMaterialBottomTabNavigator({
  HomeStack,
  AccountStack,
  SearchStack,
  OptionsStack
}, {
    inactiveColor: '#BDBDBD',
    activeColor: '#FFFFFF',
    barStyle: { backgroundColor: "#F06292" }
  });

tabNavigator.path = '';
export default tabNavigator;
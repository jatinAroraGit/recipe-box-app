import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import tabNavigator from './MainTabNavigator';
import authTabNavigator from './AuthNavigator';
import Loading from '../screens/Loading';
export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Loading: Loading,
    Auth: authTabNavigator,
    Main: tabNavigator,
  }, {
      initialRouteName: 'Loading'
    })

);

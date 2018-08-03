import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AuthStack = createStackNavigator({ SignIn: SignInScreen , Register: RegisterScreen });

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  Main: MainTabNavigator,
},
{
  initialRouteName: 'AuthLoading',
});

import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import NextRaceScreen from '../screens/NextRaceScreen';
import CompareScreen from '../screens/CompareScreen';
import ProfileScreen from '../screens/ProfileScreen';

const NextRaceStack = createStackNavigator({
  NextRace: NextRaceScreen,
});

NextRaceStack.navigationOptions = {
  tabBarLabel: 'Next Race',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-car${focused ? '' : '-outline'}`
          : 'md-car'
      }
    />
  ),
};

const CompareStack = createStackNavigator({
  Compare: CompareScreen,
});

CompareStack.navigationOptions = {
  tabBarLabel: 'Compare',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'md-search'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  NextRaceStack,
  CompareStack,
  ProfileStack,
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#232F34',
    }
  },
});

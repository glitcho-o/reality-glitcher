import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ARScreen } from '../screens/ARScreen';
import { MultiplayerScreen } from '../screens/MultiplayerScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  AR: { mode?: string };
  Multiplayer: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopColor: '#333',
        },
        tabBarActiveTintColor: '#00ff88',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AR" component={ARScreen} />
      <Tab.Screen name="Multiplayer" component={MultiplayerScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import FootballPlayersScreen from './screens/FootballPlayersScreen';
import FootballPlayerDetailScreen from './screens/FootballPlayerDetail';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FootballPlayers" component={FootballPlayersScreen} />
        <Stack.Screen name="FootballPlayerDetail" component={FootballPlayerDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

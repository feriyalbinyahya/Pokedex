
import React from 'react';
import {Text, View, StatusBar, SafeAreaView} from 'react-native';
import { textColor } from './src/assets/colors';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PokemonLibrary from './src/screens/PokemonLibrary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthProvider } from './src/context/AuthContext';
import Navigation from './src/components/Navigation';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <AuthProvider>
      <StatusBar/>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
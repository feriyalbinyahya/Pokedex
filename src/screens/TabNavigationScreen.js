
import React from 'react';
import {Text, View, StatusBar, SafeAreaView} from 'react-native';
import { textColor } from './src/assets/colors';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PokemonLibrary from './src/screens/PokemonLibrary';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabNavigationScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Library') {
              iconName = 'library';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName}  size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Library" component={PokemonLibrary} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigationScreen;
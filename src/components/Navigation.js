import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import TabNavigationScreen from '../screens/TabNavigationScreen'

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="TabNavigationScreen" component={TabNavigationScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
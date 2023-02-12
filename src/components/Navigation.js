import { View, Text } from 'react-native'
import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import TabNavigationScreen from '../screens/TabNavigationScreen'
import { AuthContext } from '../context/AuthContext'
import SplashScreen from '../screens/SplashScreen'
import PokemonDetail from '../screens/PokemonDetail'

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {isLoggin, splashLoading} = useContext(AuthContext);
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {splashLoading ? (
              <Stack.Screen name="Splash Screen" component={SplashScreen} />)
             : isLoggin == "true" ?
             <>
              <Stack.Screen name="TabNavigationScreen" component={TabNavigationScreen} />
              <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
            </>
            :
            <Stack.Screen name="Login" component={Login} />}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
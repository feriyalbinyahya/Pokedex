
import React, {useState, useContext} from 'react';
import {Text, View, StatusBar, SafeAreaView, Button, Alert} from 'react-native';
import { textColor } from './src/assets/colors';
import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PokemonLibrary from './PokemonLibrary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfilScreen from './ProfilScreen';
import GetPokemon from './GetPokemon';
import Dialog from "react-native-dialog";
import generalStyles from '../styles/generalStyles';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { customColor } from '../assets/colors';

const Tab = createBottomTabNavigator();

const TabNavigationScreen = () => {
  const [visible, setVisible] = useState(false);
  const {isLoading, logout} = useContext(AuthContext);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    logout();
    setVisible(false);
  };

  return (
    <>
    <Spinner visible={isLoading} />
      <Dialog.Container visible={visible}>
        <Dialog.Title style={generalStyles.fontBold}>Logout</Dialog.Title>
        <Dialog.Description style={generalStyles.fontRegular}>
          Do you want to log out?
        </Dialog.Description>
        <Dialog.Button label="No" onPress={handleCancel} style={{color: 'black', ...generalStyles.fontRegular}} />
        <Dialog.Button label="Yes" onPress={handleLogout} 
        style={{backgroundColor: '#06bcee', color: 'white', width: 70, borderRadius:5, margin:20, ...generalStyles.fontRegular}} />
      </Dialog.Container>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Library') {
              iconName = 'library';
            }else if (route.name === 'Profil'){
              iconName = 'person';
            }else if (route.name === 'Get Your Pokemon'){
              iconName = 'help-circle';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName}  size={size} color={color} />;
          },
          headerTitle: 'Pokedex',
          headerRight: () => {
            if(route.name == 'Profil'){
              return(
                <Ionicons name='log-out' onPress={showDialog} size={30} style={{padding: 12}} />
              );
            }
          },
          tabBarActiveTintColor: customColor.blue,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Library" component={PokemonLibrary} />
        <Tab.Screen name="Get Your Pokemon" component={GetPokemon} />
        <Tab.Screen name="Profil" component={ProfilScreen} />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigationScreen;
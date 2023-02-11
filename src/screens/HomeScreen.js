import React from 'react';
import {ImageBackground, StyleSheet, Text, View, FlatList} from 'react-native';
import Card from '../components/Card';
import generalStyles from '../styles/generalStyles';
const HomeScreen = () => {
  const pokemons = [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <View style={generalStyles.container}>

        <Text style={generalStyles.heading}>Pokedex</Text>
        <Text style={generalStyles.subHeading}>
          Search for Pokémon by name or using the National Pokédex number.
        </Text>
        <Card />
        <Card />
        <Card />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 15,
    borderRadius: 10,
    paddingLeft: 15,
  },
});
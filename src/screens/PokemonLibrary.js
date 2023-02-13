import React from 'react';
import {ImageBackground, StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable} from 'react-native';
import Card from '../components/Card';
import generalStyles from '../styles/generalStyles';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { height } from '../assets/constants';
const PokemonLibrary = ({navigation}) => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const  [isLoading, setIsLoading] = useState(false);
  
  const getPokemons = () => {
    setIsLoading(true);
    const uri = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset='+`${currentPage}`;
    axios.get(uri)
    .then(res => {
      setPokemons([...pokemons, ...res.data.results]);
  
    });
  }

  useEffect(() => {
    getPokemons();
  }, [currentPage]);

  const renderItem = ({item}) => {
    return(
      <Pressable onPress={() =>
        navigation.navigate('PokemonDetail', {uri: item.url})}>
        <Card name={item.name} />
      </Pressable>
    );
  }

  const renderLoader = () => {
    return(
      <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" />
      </View>
    );
  }

  const loadMoreItem = () => {
    
    setCurrentPage(currentPage + 10);
  }

  return (
    <>
      <View style={generalStyles.container}>
        <Text style={generalStyles.heading}>Pokemon Library</Text>
        <Text style={generalStyles.subHeading}>
          Search for Pokémon by name or using the National Pokédex number.
        </Text>
        <FlatList 
          data={pokemons} 
          renderItem={renderItem}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          style={styles.flatlistStyle}
        />
        </View>
    </>
  );
};

export default PokemonLibrary;

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 15,
    borderRadius: 10,
    paddingLeft: 15,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center'
  },
  flatlistStyle: {
    height: height/1.5
  }
});
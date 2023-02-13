import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, FlatList} from 'react-native';
import { customColor, textColor } from '../assets/colors';
import Card from '../components/Card';
import generalStyles from '../styles/generalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
const HomeScreen = () => {
  const [allPokemon, setAllPokemon] = useState([]);

  const addPokemonToList = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    allKeys.pop();
    console.log(allKeys);
    let allPoke = []
    let j=Math.floor(allKeys.length/3);
    for(let i=0; i<j; i++){
      console.log("masuk");
      let temp = {"id": '', "name": '', "image": ''};
      temp["id"] = allKeys[i];
      temp["name"] = allKeys[i+j];
      temp["image"] = allKeys[i+j+j];
      allPoke.push(temp);
      console.log(allPoke);
    }
    setAllPokemon(allPoke);
  }

  const removeStorage = () => {
    AsyncStorage.removeItem('9');
  }

  useEffect(() => {
    addPokemonToList();
    console.log(allPokemon);
}, []);
  return (
    <>
      <View style={generalStyles.container}>
        <View style={{width:'100%', height: 300, borderRadius: 10}}>
          <WebView
            source={{ uri: 'https://twitter.com/Pokemon' }}
            style={{ marginTop: 20 }}/>
        </View>
        <View style={{height: 20}}></View>
        <Text style={{...generalStyles.heading, color:customColor.pink}}>My Pokemon</Text>
      </View>
      <View style={{width: 100}}>
        <CustomButton onPress={removeStorage} text='delete' />
      </View>
      {allPokemon != [] ?
      <View>
        {allPokemon?.map((item) => {
          console.log(item);
          return (
            <View key={item.id} style={styles.cardPokemon}>
              <Text>{item.name}</Text>
            </View>
          );
        })}
      </View> :
      <View style={{alignItems:'center'}}>
        <View style={{height: 10}}></View>
        <Ionicons name='leaf-outline' size={36} color={textColor.softGrey} />
        <View style={{height: 10}}></View>
        <Text style={styles.textNoPokemon}>You don't have pokemon.</Text>
        <Text style={styles.textNoPokemon}>Get it in "Get Your Pokemon"</Text>
      </View>
      }
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
  textNoPokemon: {
    ...generalStyles.fontRegular,
    color: textColor.softGrey,
  },
  cardPokemon:{
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: customColor.pink
  }
});
import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, FlatList, Image, ScrollView, Pressable, Alert} from 'react-native';
import { customColor, textColor } from '../assets/colors';
import generalStyles from '../styles/generalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { POKEMON_DETAIL_URL } from '../config';
import Snackbar from 'react-native-snackbar';
import { useIsFocused } from "@react-navigation/core";
const HomeScreen = ({navigation}) => {
  const [allPokemon, setAllPokemon] = useState([]);
  const isFocused = useIsFocused();

  const addPokemonToList = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    allKeys.pop();
    allKeys.pop();
    let allPoke = []
    for(let i=0; i<allKeys.length; i++){
      let temp;
      temp = await AsyncStorage.getItem(allKeys[i]);
      temp = JSON.parse(temp);
      allPoke.push(temp);
    }
    setAllPokemon(allPoke);
  }


  handleDeleteItem = async (name, id, image) => {
    await AsyncStorage.removeItem(id);
    await AsyncStorage.removeItem(name);
    await AsyncStorage.removeItem(image);
    Snackbar.show({
      text: 'Deleted',
      backgroundColor: 'grey',
      duration: Snackbar.LENGTH_SHORT,
    });
    addPokemonToList();

  }


  showAlert1 = (name, id, image) => {  
    Alert.alert(  
      'Delete Pokemon',  
      'Are you sure want to remove '+name+' from your pokemon?',  
      [  
        {  
          text: 'Cancel',  
          onPress: () => console.log('Cancel Pressed'),  
          style: 'cancel',  
        },  
        {text: 'Yes', onPress: () => handleDeleteItem(name, id, image)},  
      ]  
    );  
  }

  useEffect(() => {
    addPokemonToList();
}, [isFocused]);
  return (
    <ScrollView overScrollMode='never' removeClippedSubviews={true}>
      <View style={generalStyles.container}>
        <View style={{width:'100%', height: 300, borderRadius: 10}}>
          <WebView
            nestedScrollEnabled={true} 
            source={{ uri: 'https://twitter.com/Pokemon' }}
            style={{ marginTop: 20 }}/>
        </View>
        <View style={{height: 20}}></View>
      </View>
      <Text style={{...generalStyles.heading, color:textColor.grey, marginHorizontal: 30, fontSize: 24}}>My Pokemon</Text>
      {allPokemon.length>0 ?
      <View>
        <Text style={{...styles.textNoPokemon, marginHorizontal: 30}}>You have a saved group of Pokemon.</Text>
        {allPokemon?.map((item) => {
          return (
            <View key={item.id} style={{flexDirection: 'row'}}>
              <Pressable style={{flex:5}} onPress={() =>
                navigation.navigate('PokemonDetail', {uri: POKEMON_DETAIL_URL+item.id})}>
                <View style={styles.cardPokemon}>
                    <Image style={{width: 60, height: 60}} source={{uri: item.image}} />
                    <Text style={styles.nameMyPokemon} >{item.name}</Text>
                </View>
              </Pressable>
              <Ionicons onPress={() => showAlert1(item.name, item.id, item.image)} style={{flex: 1, marginTop: 40}} name='trash' size={20} color='red' />
            </View>
          );
        })}
        <View style={{height: 20}}></View>
      </View> :
      <View style={{alignItems:'center'}}>
        <View style={{height: 40}}></View>
        <Ionicons name='leaf-outline' size={36} color={textColor.softGrey} />
        <View style={{height: 10}}></View>
        <Text style={styles.textNoPokemon}>You don't have pokemon.</Text>
        <Text style={styles.textNoPokemon}>Get it in "Get"</Text>
      </View>
      }
    </ScrollView>
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
    fontSize: 13,
    color: textColor.softGrey,
  },
  cardPokemon:{
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: customColor.pink,
    padding: 10,
    marginHorizontal: 25,
    flex:3,
    marginVertical: 10
  },
  nameMyPokemon: {
    ...generalStyles.fontBold,
    fontSize: 16,
    color: customColor.pink,
    width: 180,
    marginLeft: 15,
    marginVertical: 10
  }
});
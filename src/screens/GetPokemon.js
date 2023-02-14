import { StyleSheet, Text, View, Image, ActivityIndicator, Button } from 'react-native'
import React, {useState} from 'react'
import CustomButton from '../components/CustomButton'
import pokemonDetailApi from '../api/pokemonDetailApi';
import { POKEMON_DETAIL_URL } from '../config';
import Dialog from "react-native-dialog";
import Snackbar from 'react-native-snackbar';
import generalStyles from '../styles/generalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { textColor } from '../assets/colors';

const GetPokemon = () => {
  const [yourPoke, setYourPoke] = useState([]);
  const  [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  const getPoke = async () => {
    setIsLoading(true);
    let randomNumber = Math.ceil(Math.random() * 1008);
    let uri = POKEMON_DETAIL_URL+randomNumber;
    let result = await pokemonDetailApi(uri);
    let yourPokeData = [randomNumber.toString(), result.name.toUpperCase(), result.sprites.front_default,
    uri];
    setYourPoke(yourPokeData);
  }

  const handleGetPokemon = () => {
    setAnimating(true);
    getPoke();
    closeActivityIndicator();
  }

  const showDialog = () => {
    setVisible(true);
  };

  const handleRelease = () => {
    setVisible(false);
  };

  const savePokemon = async () => {
    let temp = await AsyncStorage.getItem(yourPoke[0]);
    if(temp){
      Snackbar.show({
        text: 'Already exist',
        backgroundColor: 'green',
        duration: Snackbar.LENGTH_SHORT,
      });
    }else{
      Snackbar.show({
        text: 'Saved',
        backgroundColor: 'green',
        duration: Snackbar.LENGTH_SHORT,
      });
      let storedPokeInfo = JSON.stringify({"id": yourPoke[0], "name": yourPoke[1], "image": yourPoke[2]});
      await AsyncStorage.setItem(yourPoke[0], storedPokeInfo);
    }
  }

  const handleSave = () => {
    savePokemon();
    setVisible(false);
  };

  const closeActivityIndicator = () => {
    setTimeout(() => {
      setAnimating(false);
      showDialog();
    }, 2000);
  }

  return (
    <View style={{alignItems: 'center'}}>
      <Dialog.Container contentStyle={{backgroundColor: 'white'}} visible={visible}>
        <Dialog.Title style={generalStyles.fontBold}>This is your new pokemon!</Dialog.Title>
        <Dialog.Description style={generalStyles.fontRegular}>
          Do you want to save this to your pokemon?
        </Dialog.Description>
        {yourPoke[2] != null ?
          <View style={{alignItems: 'center'}}>
            <Image style={{width: 180, height: 180}} source={{uri: yourPoke[2]}} />
            <Text style={generalStyles.subHeading}>{yourPoke[1]}</Text>
          </View>
          : null
        }
        <Dialog.Button label="Release" onPress={handleRelease} style={{color: 'black', ...generalStyles.fontRegular}} />
        <Dialog.Button label="Save" onPress={handleSave} 
        style={{backgroundColor: '#06bcee', color: 'white', width: 70, borderRadius:5, margin:20, ...generalStyles.fontRegular}} />
      </Dialog.Container>
      <View style={{height: 80}}></View>
      <Image style={{width: 120, height: 120}} source={require('../assets/Images/pokeball.png')} />
      <View style={{height: 30}}></View>
      <View style={{width: 180}}>
        <Button
          title="Get Pokemon"
          onPress={handleGetPokemon}
          disabled={animating}
        />
      </View>
      <View style={{alignItems: 'center', width: 180, marginVertical: 30}}>
        <Text style={{...generalStyles.fontRegular, color: textColor.softGrey, fontSize: 12, textAlign: 'center'}}>
          Save the pokemon that you've got to keep it in your bag. Release it if you don't want to save.
          </Text>
      </View>
      <ActivityIndicator animating = {animating} color = 'grey' size = "large"
        style = {styles.activityIndicator}/>
    </View>
  )
}

export default GetPokemon

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30
 }
})
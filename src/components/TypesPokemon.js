import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import generalStyles from '../styles/generalStyles'
import { colors } from '../assets/colors';

const backgColor = {
  "bug": colors.bug,
  "dark": colors.dark,
  "dragon": colors.dragon,
  "electric": colors.electric,
  "fairy": colors.fairy,
  "fighting": colors.fighting,
  "fire": colors.fire,
  "flying": colors.flying,
  "ghost": colors.ghost,
  "grass": colors.grass,
  "ground": colors.ground,
  "ice": colors.ice,
  "normal": colors.normal,
  "poison": colors.poison,
  "psychic": colors.psychic,
  "rock": colors.rock,
  "steel": colors.steel,
  "water": colors.water,
};

const TypesPokemon = ({text}) => {
  console.log(text);
  return (
    <View style={{...styles.container, backgroundColor: backgColor[text]}}>
      <Text style={styles.textTypes}>{text}</Text>
    </View>
  )
}

export default TypesPokemon

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5
  },
  textTypes: {
    fontSize: 10,
    color: 'white',
    ...generalStyles.fontRegular
  }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import generalStyles from '../styles/generalStyles'
import { colors } from '../assets/colors';

const AbilityPokemon = ({text, color}) => {
  console.log(text);
  return (
    <View style={{...styles.container, backgroundColor: color}}>
      <Text style={styles.textTypes}>{text}</Text>
    </View>
  )
}

export default AbilityPokemon

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
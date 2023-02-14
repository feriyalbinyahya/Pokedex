import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { backgroundColors, customColor } from '../assets/colors'
import generalStyles from '../styles/generalStyles'

const Card = (props) => {
  return (
    <View style={{...styles.card, backgroundColor: customColor.pink}}>
      <View>
        <Text style={generalStyles.title}>{props.name}</Text>
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    }
})
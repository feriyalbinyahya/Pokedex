import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import generalStyles from '../styles/generalStyles'

const CustomButton = ({onPress, text}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3B71F3',
        padding: 15,
        width: '100%',
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        ...generalStyles.buttonWhite
    }
})
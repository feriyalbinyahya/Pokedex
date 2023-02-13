import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import generalStyles from '../styles/generalStyles';

const IconButton = ({text, icon, backgroundcolor, onPress}) => {
  return (
    <Pressable style={{width: '70%'}}>
      <View style={styles.container}>
        <Ionicons name={icon} size={12} color='white' />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FD8A8A',
        paddingVertical: 5,
        paddingHorizontal: 15,
        width: '100%',
        marginVertical: 3,
        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        fontSize: 12,
        ...generalStyles.fontRegular,
        color: 'white',
        marginHorizontal: 5,
    }
})
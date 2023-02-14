import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import generalStyles from '../styles/generalStyles'
import { textColor } from '../assets/colors'

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput
      placeholderTextColor={textColor.softGrey}
       placeholder={placeholder} 
       style={styles.input}
       value={value}
       onChangeText={setValue}
       secureTextEntry={secureTextEntry}
       />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5
    },
    input: {
        ...generalStyles.fontRegular,
        color: textColor.grey
    }
})
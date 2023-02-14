import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import generalStyles from '../styles/generalStyles';
import { customColor, textColor } from '../assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfilScreen = () => {
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    let storedUserInfo = await AsyncStorage.getItem('userInfo');
    setUserInfo(JSON.parse(storedUserInfo));
  } 

  useEffect(() => {
    getUserInfo();
}, []);
  return (
    <>
    {userInfo != {} ?
    <View style={styles.boxProfile}>
      <Image style={{width: 100, height: 100}} source={ (userInfo.image) ? 
      { uri: userInfo.image } : require('../assets/Images/user.png')} />
      <View style={{height: 15}}></View>
      <Text style={{color: textColor.grey}}>@{userInfo.username}</Text>
      <View style={styles.textName}>
        <Text style={{...generalStyles.fontBold,  fontSize: 18, color: textColor.grey}}>{userInfo.firstName}</Text>
        <Text style={{...generalStyles.fontBold,  fontSize: 18, color: textColor.grey}}>{userInfo.lastName}</Text>
      </View>
      {userInfo.gender == "female" ? 
      <Ionicons name='female' size={20} color={customColor.pink} /> : 
      <Ionicons name='male' size={20} color={customColor.blue} />
      }
    </View>
     : ''}
    </>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({
  textName: {
    alignItems: 'center',
    marginVertical: 20,
  },
  boxProfile: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginVertical:30,
    padding:30,
    borderRadius: 8,
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,
  },
})
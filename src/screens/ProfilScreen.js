import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'

const ProfilScreen = () => {
  const [userInfo, setUserInfo] = useState();
 

  useEffect(() => {
    getUserInfo();
}, []);
  return (
    <View>
      <Text>ProfilScreen</Text>
    </View>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import {useState, useEffect} from 'react';
import Logo from '../assets/Images/pokeball.png'
import { height } from '../assets/constants'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {isLoading, login} = useContext(AuthContext);

    return (
        <View style={styles.root}>
            <Spinner visible={isLoading} />
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
            <View style={{height: 20}}></View>
            <Text>{val}</Text>
            <CustomInput placeholder="Email" />
            <CustomInput placeholder="Password" secureTextEntry={true} />
            <View style={{height: 20}}></View>
            <CustomButton text='Login' onPress={login(username, password)} />
        </View>
    );
}

export default Login

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        height: height * 0.15,
    },
})
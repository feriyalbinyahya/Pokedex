import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import {useState, useEffect} from 'react';
import Logo from '../assets/Images/pokeball.png'
import { height } from '../assets/constants'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Snackbar from 'react-native-snackbar';
import generalStyles from '../styles/generalStyles';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {isLoading, login, isLoggin, loginNew} = useContext(AuthContext);


    return (
        <View style={styles.root}>
            <Spinner visible={isLoading} />
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
            <View style={{height: 20}}></View>
            <Text style={generalStyles.heading}>Log In to Pokedex</Text>
            <View style={{height: 10}}></View>
            <CustomInput placeholder="Email" value={username} setValue={setUsername} />
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
            <View style={{height: 20}}></View>
            <CustomButton text='Login' onPress={async () => {
                if(username=='' || password==''){
                    Snackbar.show({
                        text: 'Please fill in all the fields',
                        backgroundColor: 'red',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                    return;
                }
                await loginNew(username, password);
                if(isLoggin == "false"){
                    Snackbar.show({
                        text: 'Username or password is wrong',
                        backgroundColor: 'red',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
            }} />
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
import { View, Text } from 'react-native'
import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios';
import { BASE_URL, LOGIN_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoggin, setIsLoggin] = useState("false");
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    const login = async (username, password) => {
        setIsLoading(true);
        console.log(username);
        console.log(password);

        await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          }).then(res => {
                //let userInfo = res.data;
                if(res.status == "200"){
                    //setUserInfo(userInfo)
                    console.log("aman");
                    setIsLoggin("true");
                    AsyncStorage.setItem('isLoggin', "true");
                }else{
                    setIsLoggin("false");
                    AsyncStorage.setItem('isLoggin', "false");
                }
                setIsLoading(false);
            }).catch(e => {
                console.log(`login error ${e}`);
        });
    };

    const isLoggedIn = async () => {
        try{
            setSplashLoading(true);
            let isLoggin = await AsyncStorage.getItem('isLoggin');
            if(isLoggin == "true"){
                setIsLoggin(isLoggin);
            }

            setSplashLoading(false);
        }catch(e){
            setSplashLoading(false);
            console.log(`login error ${e}`);
        }
    }

    const logout = () => {
        setIsLoading(true);
        AsyncStorage.removeItem('isLoggin');
        setIsLoggin("false");
        setIsLoading(false);
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

  return (
    <AuthContext.Provider value={{
        isLoading,
        userInfo,
        login,
        logout,
        isLoggin,
        splashLoading
    }}>{children}</AuthContext.Provider>
  )
}
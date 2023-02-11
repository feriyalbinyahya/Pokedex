import { View, Text } from 'react-native'
import React, {createContext, useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  return (
    <AuthContext.Provider value="Test value">{children}</AuthContext.Provider>
  )
}
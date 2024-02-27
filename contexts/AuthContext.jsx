import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sessionId, setSessionId] = useState(null);
    const [accountId, setAccountId] = useState(null); // BEGIN: Added accountId state

    const login = async (sessionId, accountId) => { // BEGIN: Added accountId parameter
        sessionId = sessionId.toString();
        accountId = accountId.toString();
        await AsyncStorage.setItem('loggedIn', 'true');
        await AsyncStorage.setItem('sessionId', sessionId);
        await AsyncStorage.setItem('accountId', accountId); // BEGIN: Store accountId
        setLoggedIn(true);
        setSessionId(sessionId);
        setAccountId(accountId); // BEGIN: Set accountId state
        console.log('Logged in with session ID:', sessionId);
        console.log('Logged in with account ID:', accountId); // BEGIN: Log accountId
    };
    
    const logout = async () => {
        await AsyncStorage.removeItem('loggedIn');
        await AsyncStorage.removeItem('sessionId');
        setLoggedIn(false);
        setSessionId(null);
        setAccountId(null); // BEGIN: Reset accountId state
    };
    
    useEffect(() => {
        const loadSessionId = async () => {
            const storedSessionId = await AsyncStorage.getItem('sessionId');
            if (storedSessionId) {
                setSessionId(storedSessionId);
            }
        };
    
        loadSessionId();
    }, []);
    

    return (
      <AuthContext.Provider value={{ loggedIn, loading, login, logout, sessionId, accountId }}>
      {children}
    </AuthContext.Provider>
    );
};

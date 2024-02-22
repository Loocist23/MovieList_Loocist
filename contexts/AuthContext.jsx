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

    const login = async (sessionId) => {
        sessionId = sessionId.toString();
        await AsyncStorage.setItem('loggedIn', 'true');
        await AsyncStorage.setItem('sessionId', sessionId); // Stockez l'ID de session
        setLoggedIn(true);
        setSessionId(sessionId);
    };
    
    const logout = async () => {
        await AsyncStorage.removeItem('loggedIn');
        await AsyncStorage.removeItem('sessionId'); // Supprimez l'ID de session stocké
        setLoggedIn(false);
        setSessionId(null);
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
      <AuthContext.Provider value={{ loggedIn, loading, login, logout, sessionId }}>
      {children}
    </AuthContext.Provider>
    );
};

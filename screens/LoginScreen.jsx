import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native'; // Added Image import
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import config from '../config';
import { useSettings } from '../contexts/SettingsContext';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { themeObject } = useSettings();

  const createRequestToken = async () => {
    try {
      const response = await axios.get(`${config.API_ROOT_URL}authentication/token/new?api_key=${config.API_KEY}`);
      const requestToken = response.data.request_token;
      return requestToken;
    } catch (error) {
      console.error(error);
    }
  };

  const authenticateRequestTokenWithLogin = (requestToken) => {
    return axios.post(`${config.API_ROOT_URL}authentication/token/validate_with_login?api_key=${config.API_KEY}`, {
      username: username.replace(/\s/g, ''),
      password: password,
      request_token: requestToken
    });
  };

  const createSessionId = async (requestToken) => {
    try {
      const response = await axios.post(`${config.API_ROOT_URL}authentication/session/new?api_key=${config.API_KEY}`, {
        request_token: requestToken
      });
      const sessionId = response.data.session_id;
      return sessionId;
    } catch (error) {
      console.error(error);
    }
  };

  const getAccountId = async (sessionId) => {
    try {
      const response = await axios.get(`${config.API_ROOT_URL}account?api_key=${config.API_KEY}&session_id=${sessionId}`);
      const accountId = response.data.id;
      return accountId;
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = async () => {
    if (!username || !password) {
      console.log('Email et/ou mot de passe manquants');
      return;
    }
  
    try {
      const requestToken = await createRequestToken();
      if (!requestToken) {
        console.log('Impossible de créer un token de requête');
        return;
      }
  
      await authenticateRequestTokenWithLogin(requestToken);
  
      const sessionId = await createSessionId(requestToken);
      if (!sessionId) {
        console.log('Impossible de créer un ID de session');
        return;
      }

      const accountId = await getAccountId(sessionId);
  
      await login(sessionId, accountId);
  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: themeObject.colors.background}]}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  logo: {
    alignSelf: 'center', // Added to center the logo horizontally
    marginTop: 16, // Added margin to create space between the logo and other elements
  },
});

export default LoginScreen;

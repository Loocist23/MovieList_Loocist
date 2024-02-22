import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import config from '../config';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const createRequestToken = async () => {
    try {
      const response = await axios.get(`${config.API_ROOT_URL}authentication/token/new?api_key=${config.API_KEY}`);
      const requestToken = response.data.request_token;
      return requestToken;
    } catch (error) {
      console.error('Erreur lors de la création du token de requête:', error);
    }
  };

  const authenticateRequestTokenWithLogin = (requestToken) => {
    return axios.post(`${config.API_ROOT_URL}authentication/token/validate_with_login?api_key=${config.API_KEY}`, {
      username: username.replace(/\s/g, ''), // Remove spaces from username
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
      console.error('Erreur lors de la création de l\'ID de session:', error);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      console.log('Email et/ou mot de passe manquants');
      return;
    }
  
    try {
      // Étape 1 : Créer un token de requête
      const requestToken = await createRequestToken();
      if (!requestToken) {
        console.log('Impossible de créer un token de requête');
        return;
      }
  
      // Étape 2 : Authentifier le token de requête avec les identifiants de l'utilisateur
      await authenticateRequestTokenWithLogin(requestToken);
  
      // Étape 3 : Créer un ID de session
      const sessionId = await createSessionId(requestToken);
      if (!sessionId) {
        console.log('Impossible de créer un ID de session');
        return;
      }
  
      // Vous pouvez maintenant utiliser sessionId pour les requêtes authentifiées
      // Stockez sessionId pour une utilisation future et mettez à jour l'état de connexion
      console.log('Connexion réussie avec session ID:', sessionId);
      await login(sessionId); // Assurez-vous que votre fonction login accepte un paramètre pour l'ID de session
  
    } catch (error) {
      console.error('Erreur lors du processus de connexion:', error);
    }
  };

  return (
    <View style={styles.container}>
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
});

export default LoginScreen;

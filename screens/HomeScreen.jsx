import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'; // Replace with the actual path to your config file
import { View, Text, Image } from 'react-native';
import { Avatar, Title, Paragraph } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const { sessionId } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${config.API_ROOT_URL}account?api_key=${config.API_KEY}&session_id=${sessionId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (

    <View>
      {profileData ? (
        <View>
          <Paragraph style={styles.title}>Welcome back: {profileData.username}</Paragraph>
        </View>
      ) : (
        <Text style={styles.title}>Loading profile data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
});

export default ProfileScreen;

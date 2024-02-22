import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Avatar, Title, Paragraph } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { sessionId } = useAuth();
  const { themeObject } = useSettings();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${config.API_ROOT_URL}account?api_key=${config.API_KEY}&session_id=${sessionId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchFavoriteMovies = async () => {
      try {
        const response = await axios.get(`${config.API_ROOT_URL}account/{account_id}/favorite/movies?api_key=${config.API_KEY}&session_id=${sessionId}`);
        setFavoriteMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };

    fetchProfileData();
    fetchFavoriteMovies();
  }, []);

  const handlePressMovieCard = (movieId) => {
    setSelectedMovieId(movieId);
    setIsModalVisible(true);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeObject.colors.background }]}>
      {profileData ? (
        <View style={styles.profileSection}>
          <Avatar.Image
            source={{ uri: `https://www.gravatar.com/avatar/${profileData.avatar.gravatar.hash}` }}
            size={80}
          />
          <Title>{profileData.name}</Title>
          <Paragraph>Username: {profileData.username}</Paragraph>
          <Paragraph>Language: {profileData.iso_639_1}</Paragraph>
          <Paragraph>Country: {profileData.iso_3166_1}</Paragraph>
        </View>
      ) : (
        <Text>Loading profile data...</Text>
      )}

      <View style={styles.section}>
        <Title>Films favoris</Title>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
              <View key={movie.id} style={styles.movieCardContainer}>
                <MovieCard movie={movie} onPress={() => handlePressMovieCard(movie.id)} />
              </View>
            ))
          ) : (
            <Text style={{ color: themeObject.colors.text }}>Aucun film favori.</Text>
          )}
        </ScrollView>
      </View>

      <MovieDetailsModal
        isVisible={isModalVisible}
        movieId={selectedMovieId}
        onClose={() => setIsModalVisible(false)}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  movieCardContainer: {
    marginRight: 10, // Ajoutez une marge à droite de chaque carte pour espacer les éléments
  },
});

export default ProfileScreen;

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import config from '../config';
import MovieCard from '../components/MovieCard';
import { useNavigation } from '@react-navigation/native';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { useAuth } from '../contexts/AuthContext';

const FavouriteScreen = () => {
  const [movies, setMovies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { accountId, sessionId } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${config.API_ROOT_URL}account/${accountId}/favorite/movies?api_key=${config.API_KEY}&session_id=${sessionId}`);
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [accountId, sessionId]);

  const handlePressMovieCard = (movieId) => {
    setSelectedMovieId(movieId);
    setIsModalVisible(true);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onPress={handlePressMovieCard} />
      ))}
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
});

export default FavouriteScreen;

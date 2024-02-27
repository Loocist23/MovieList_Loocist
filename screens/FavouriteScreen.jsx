import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import config from '../config';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { useAuth } from '../contexts/AuthContext';

const FavouriteScreen = () => {
  const [movies, setMovies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { accountId, sessionId } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      console.log('Fetching favourite movies...');
      try {
        const response = await axios.get(`${config.API_ROOT_URL}account/${accountId}/favorite/movies?api_key=${config.API_KEY}&session_id=${sessionId}`);
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();

    const intervalId = setInterval(fetchMovies, 20000); // Fetch movies every 20 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, [accountId, sessionId]);

  const handlePressMovieCard = (movieId) => {
    setSelectedMovieId(movieId);
    setIsModalVisible(true);
  };

  const handleFavouriteUpdate = (movieId) => {
    setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== movieId));
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onPress={() => handlePressMovieCard(movie.id)} />
      ))}
      <MovieDetailsModal
        isVisible={isModalVisible}
        movieId={selectedMovieId}
        onClose={() => setIsModalVisible(false)}
        isFavourite={movies.some(movie => movie.id === selectedMovieId)}
        onFavouriteUpdate={handleFavouriteUpdate}
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

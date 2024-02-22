import React from 'react';
import { ScrollView, StyleSheet, Button } from 'react-native';
import { usePopularMovies } from '../hooks/usePopularMovies'; // Assurez-vous d'importer le hook correctement
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';

const PopularScreen = () => {
  const { movies, isModalVisible, selectedMovieId, handlePressMovieCard, handleLoadMore, setIsModalVisible } = usePopularMovies();

  return (
    <ScrollView style={styles.container}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onPress={handlePressMovieCard} />
      ))}
      <MovieDetailsModal
        isVisible={isModalVisible}
        movieId={selectedMovieId}
        onClose={() => setIsModalVisible(false)}
      />
      <Button title="Charger plus" onPress={handleLoadMore} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default PopularScreen;

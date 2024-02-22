import React from 'react';
import { ScrollView, StyleSheet, Button } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { useNewsMovies } from '../hooks/useNewsMovies'; // Assurez-vous d'importer le hook correctement

const NewsScreen = () => {
  const { movies, category, selectedMovieId, setCategory, openMovieDetailsModal, closeMovieDetailsModal, loadMoreMovies } = useNewsMovies();

  return (
    <ScrollView style={styles.container}>
      <SegmentedButtons
        value={category}
        onValueChange={(value) => {
          setCategory(value);
        }}
        style={styles.segmentedButtons}
        buttons={[
          { value: 'now_playing', label: 'En salle' },
          { value: 'upcoming', label: 'Prochainement' },
        ]}
      />

      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onPress={() => openMovieDetailsModal(movie.id)} />
      ))}

      {selectedMovieId && (
        <MovieDetailsModal movieId={selectedMovieId} onClose={closeMovieDetailsModal} />
      )}

      <Button title="Charger plus" onPress={loadMoreMovies} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default NewsScreen;

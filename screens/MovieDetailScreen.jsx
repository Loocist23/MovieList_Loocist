import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=faf30dd1010ebaacde85beaadb7c4d49`)
      .then(response => response.json())
      .then(data => setMovieDetails(data))
      .catch(error => console.error(error));
  }, [movieId]);

  if (!movieDetails) {
    return <Text>Loading...</Text>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: posterUrl }} style={styles.poster} />
      <Text style={styles.title}>{movieDetails.title}</Text>
      <Text style={styles.tagline}>{movieDetails.tagline}</Text>
      <View style={styles.infoSection}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overview}>{movieDetails.overview}</Text>
        <Text style={styles.info}>Genre: {movieDetails.genres.map(genre => genre.name).join(', ')}</Text>
        <Text style={styles.info}>Release Date: {movieDetails.release_date}</Text>
        <Text style={styles.info}>Runtime: {movieDetails.runtime} minutes</Text>
        <Text style={styles.info}>Rating: {movieDetails.vote_average} ({movieDetails.vote_count} votes)</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster: {
    height: 400,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  tagline: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoSection: {
    paddingHorizontal: 16,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default MovieDetailScreen;

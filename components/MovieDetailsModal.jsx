// MovieDetailsModal.jsx
import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { Button, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import config from '../config';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useSettings } from '../contexts/SettingsContext'; // Assurez-vous que le chemin est correct


const MovieDetailsModal = ({ isVisible, movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { themeObject } = useSettings(); // Utilisez useSettings pour accéder à l'objet de thème

  useEffect(() => {
    if (movieId) {
      axios.get(`${config.API_ROOT_URL}/movie/${movieId}?api_key=${config.API_KEY}`)
        .then((response) => {
          setMovieDetails(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [movieId]);

  if (!movieDetails) return null;

  const posterUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
  const votePercentage = movieDetails.vote_average * 10;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalView, { backgroundColor: themeObject.colors.background }]}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
          <View style={styles.overlay} >
            <Image source={{ uri: posterUrl }} style={styles.poster} />
          </View>
          <Title >{movieDetails.title}</Title>
          <Paragraph >Adult: {movieDetails.adult ? 'Yes' : 'No'}</Paragraph>
          <Paragraph >Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</Paragraph>
          <Paragraph >Homepage: {movieDetails.homepage}</Paragraph>
          <Paragraph >Original Language: {movieDetails.original_language}</Paragraph>
          <Paragraph >Original Title: {movieDetails.original_title}</Paragraph>
          <Paragraph >Overview: {movieDetails.overview}</Paragraph>
          <Paragraph >Popularity: {movieDetails.popularity}</Paragraph>
          <Paragraph >Production Companies: {movieDetails.production_companies.map(company => company.name).join(', ')}</Paragraph>
          <Paragraph >Production Countries: {movieDetails.production_countries.map(country => country.name).join(', ')}</Paragraph>
          <Paragraph >Release Date: {movieDetails.release_date}</Paragraph>
          <Paragraph >Spoken Languages: {movieDetails.spoken_languages.map(language => language.name).join(', ')}</Paragraph>
          <Paragraph >Status: {movieDetails.status}</Paragraph>
          <Paragraph >Tagline: {movieDetails.tagline}</Paragraph>
          <View style={styles.circularProgressContainer}>
            <Paragraph >Vote Average: {movieDetails.vote_average} ({movieDetails.vote_count} votes)</Paragraph>
            <AnimatedCircularProgress
              size={120}
              width={15}
              fill={votePercentage}
              tintColor={themeObject.colors.primary}
              backgroundColor={themeObject.colors.inverseSurface}
              padding={10}
            >
              {fill => <Paragraph style={styles.progressText}>{`${Math.round(votePercentage)}%`}</Paragraph>}
            </AnimatedCircularProgress>
          </View>
        </ScrollView>
        <Button onPress={onClose} style={styles.closeButton} mode="contained">
          Fermer
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    height: '100%',
    width: '100%',
    padding: 20,
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 20,
  },
  buttonText: {
    textAlign: "center",
  },
  poster: {
    width: '100%',
    height: 400,
    resizeMode: 'contain', // ou 'cover' selon le rendu souhaité
  },
  circularProgressContainer: {
    marginVertical: 20,
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MovieDetailsModal;
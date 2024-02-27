import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Button, Title, Paragraph, IconButton } from 'react-native-paper';
import axios from 'axios';
import config from '../config';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';

const MovieDetailsModal = ({ isVisible, movieId, onClose, isFavourite, onFavouriteUpdate }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { themeObject } = useSettings();
  const { sessionId, accountId } = useAuth();

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

  const toggleFavourite = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        favorite: !isFavourite
      })
    };

    try {
      const response = await fetch(`${config.API_ROOT_URL}/account/${accountId}/favorite?api_key=${config.API_KEY}&session_id=${sessionId}`, options);
      const jsonResponse = await response.json();

      if (jsonResponse.success) {

        if (onFavouriteUpdate) {
          onFavouriteUpdate();
        }
      } else {
        console.error(jsonResponse.status_message);
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

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
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.overlay}>
            <Image source={{ uri: posterUrl }} style={styles.poster} />
            <IconButton
              icon={isFavourite ? "heart" : "heart-outline"}
              color={themeObject.colors.primary}
              size={24}
              onPress={toggleFavourite}
              style={styles.favouriteIcon}
            />
          </View>

          <View style={styles.infoBox}>
            <Title style={{ color: themeObject.colors.text }}>{movieDetails.title}</Title>
            <Text style={[styles.infoText, { color: themeObject.colors.text }]}>Overview: {movieDetails.overview}</Text>
            <View style={styles.infoBox}>
              <Text style={[styles.infoText, { color: themeObject.colors.text }]}>Adult: {movieDetails.adult ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.genreContainer}>
              {movieDetails.genres.map((genre) => (
                <View key={genre.id} style={styles.genreBox}>
                  <Text style={[styles.genreText, { color: themeObject.colors.text }]}>{genre.name}</Text>
                </View>
              ))}
            </View>
            <Text style={[styles.infoText, { color: themeObject.colors.text }]}>Release Date: {movieDetails.release_date}</Text>
            <Text style={[styles.infoText, { color: themeObject.colors.text }]}>Status: {movieDetails.status}</Text>
            <Text style={[styles.infoText, { color: themeObject.colors.text }]}>Tagline: {movieDetails.tagline}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={[styles.infoText, { color: themeObject.colors.text }]}>Original Language: {movieDetails.original_language}</Text>
            <Text style={[styles.infoText, { color: themeObject.colors.text }]}>Original Title: {movieDetails.original_title}</Text>
            <Text style={[styles.infoText, { color: themeObject.colors.text }]}>Production Companies: {movieDetails.production_companies.map(company => company.name).join(', ')}</Text>
            <Text style={[styles.infoText, { color: themeObject.colors.text }]}>Production Countries: {movieDetails.production_countries.map(country => country.name).join(', ')}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={[styles.infoText, { color: themeObject.colors.text }]}>Popularity: {movieDetails.popularity}</Text>
            <View style={styles.circularProgressContainer}>
              <Text style={[styles.infoText, { color: themeObject.colors.text }]}>Vote Average: {movieDetails.vote_average} ({movieDetails.vote_count} votes)</Text>
              <AnimatedCircularProgress
                size={120}
                width={15}
                fill={votePercentage}
                tintColor={themeObject.colors.primary}
                backgroundColor={themeObject.colors.inverseSurface}
                padding={10}
              >
                {fill => <Text style={[styles.progressText, { color: themeObject.colors.text }]}>{`${Math.round(votePercentage)}%`}</Text>}
              </AnimatedCircularProgress>
            </View>
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
  closeButton: {
    padding: 10,
    margin: 20,
  },
  poster: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  circularProgressContainer: {
    marginVertical: 20,
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: 400,
  },
  favouriteIcon: {
    position: 'absolute',
    bottom: 10,
    right: -10,
  },
  infoBox: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  infoText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  genreBox: {
    width: '45%',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  genreText: {
    textAlign: 'center',
  },
});

export default MovieDetailsModal;
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton, Paragraph } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { useProfileData } from '../hooks/useProfileData';
import SearchResultsModal from '../components/SearchResultModal';
import { useNewsMovies } from '../hooks/useNewsMovies';

const HomeScreen = () => {
  const { sessionId } = useAuth();
  const { themeObject } = useSettings();
  const { profileData, searchQuery, setSearchQuery, isSearchModalVisible, setIsSearchModalVisible, searchResults, handleSearch } = useProfileData(sessionId);

  // Dans votre composant
  const { movies, category, selectedMovieId, setCategory, openMovieDetailsModal, closeMovieDetailsModal, loadMoreMovies } = useNewsMovies();

  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.searchBarContainer, { backgroundColor: themeObject.colors.background }]}>
          <View style={styles.searchInputContainer}>
            <PaperTextInput
              style={[styles.searchInput, { color: themeObject.colors.text }]}
              placeholder="Search movies"
              placeholderTextColor={themeObject.colors.text}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <PaperButton mode="contained" onPress={handleSearch} style={styles.searchButton}>
            Search
          </PaperButton>
        </View>
        {profileData ? (
          <Paragraph style={styles.title}>Welcome back: {profileData.username}</Paragraph>
        ) : (
          <Text style={styles.title}>Loading profile data...</Text>
        )}
      </ScrollView>
      <SearchResultsModal
        isVisible={isSearchModalVisible}
        onClose={() => setIsSearchModalVisible(false)}
        searchResults={searchResults}
        themeObject={themeObject}
        onPressItem={openMovieDetailsModal} // Ici, vous passez la fonction pour ouvrir les détails du film
      />
      {showImage && (
        <Image
          source={require('../assets/braque.jpg')}
          style={styles.image}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  searchInputContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  searchInput: {
    minHeight: 20,
    height: 20,
    padding: 10,
    borderTopLeftRadius: 45,
    borderBottomLeftRadius: 45,
    flex: 1,
  },
  searchButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: 0,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchResultItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  movieImage: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
  },
  movieOverview: {
    fontSize: 14,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
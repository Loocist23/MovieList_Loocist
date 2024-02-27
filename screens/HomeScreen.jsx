import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'; // Replace with the actual path to your config file
import { View, Text, Image, TextInput, Button, Modal, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Paragraph, TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { StyleSheet } from 'react-native';
import { useSettings } from '../contexts/SettingsContext';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { sessionId } = useAuth();
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { themeObject } = useSettings();

  const SearchResultItem = ({ movie, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.searchResultItem}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.movieImage}
        />
        <View style={[styles.movieInfo, { color: themeObject.colors.text }]}>
          <Text style={[styles.movieTitle, { color: themeObject.colors.text }]}>{movie.title}</Text>
          <Text style={[styles.movieOverview, { color: themeObject.colors.text }]}>{movie.overview}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${config.API_ROOT_URL}search/movie?api_key=${config.API_KEY}&query=${searchQuery}`);
      setSearchResults(response.data.results); // Mise à jour de l'état avec les résultats
      setIsSearchModalVisible(true); // Ouverture de la modal
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

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
          <View>
            <Paragraph style={styles.title}>Welcome back: {profileData.username}</Paragraph>
          </View>
        ) : (
          <Text style={styles.title}>Loading profile data...</Text>
        )}



        <Modal
          visible={isSearchModalVisible}
          onRequestClose={() => setIsSearchModalVisible(false)}
        >
          <View style={[styles.modalContainer, { backgroundColor: themeObject.colors.background }]}>
            <View style={styles.searchBarContainer}>
              <View style={styles.searchInputContainer}>
                <PaperTextInput
                  style={[styles.searchInput, { color: themeObject.colors.text }]}
                  placeholder="Search movies"
                  placeholderTextColor={themeObject.colors.text}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <PaperButton mode="contained" onPress={() => setIsSearchModalVisible(false)} style={styles.searchButton}>
                Close
              </PaperButton>
            </View>
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <SearchResultItem
                  movie={item}
                  onPress={() => {
                    setSelectedMovieId(item.id);
                    setIsSearchModalVisible(false);
                    setIsModalVisible(true); // Ouvre la modal MovieDetailsModal avec les détails du film sélectionné
                  }}
                />
              )}
            />
          </View>
        </Modal>
      </ScrollView>
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
  searchResultItem: {
    marginBottom: 10,
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
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieOverview: {
    fontSize: 14,
  },
});

export default ProfileScreen;
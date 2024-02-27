import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton, Paragraph } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { useProfileData } from '../hooks/useProfileData';
import SearchResultsModal from '../components/SearchResultModal';

const ProfileScreen = () => {
  const { sessionId } = useAuth();
  const { themeObject } = useSettings();
  const { profileData, searchQuery, setSearchQuery, isSearchModalVisible, setIsSearchModalVisible, searchResults, handleSearch } = useProfileData(sessionId);

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
        onPressItem={(movie) => {
          setIsSearchModalVisible(false);
        }}
      />
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
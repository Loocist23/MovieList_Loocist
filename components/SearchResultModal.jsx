import React from 'react';
import { Modal, View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

const SearchResultsModal = ({ isVisible, onClose, searchResults, themeObject, onPressItem }) => {
  const SearchResultItem = ({ movie }) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(movie)} style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={{ width: 50, height: 75, marginRight: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: themeObject.colors.text }}>{movie.title}</Text>
          <Text style={{ fontSize: 14, color: themeObject.colors.text }}>{movie.overview}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, padding: 20, backgroundColor: themeObject.colors.background }}>
        <PaperButton mode="contained" onPress={onClose} style={{ marginBottom: 20 }}>
          Close
        </PaperButton>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SearchResultItem movie={item} />}
        />
      </View>
    </Modal>
  );
};

export default SearchResultsModal;

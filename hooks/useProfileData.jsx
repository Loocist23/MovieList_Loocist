import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export const useProfileData = (sessionId) => {
  const [profileData, setProfileData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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
  }, [sessionId]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${config.API_ROOT_URL}search/movie?api_key=${config.API_KEY}&query=${searchQuery}`);
      setSearchResults(response.data.results);
      setIsSearchModalVisible(true);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return { profileData, searchQuery, setSearchQuery, isSearchModalVisible, setIsSearchModalVisible, searchResults, handleSearch };
};

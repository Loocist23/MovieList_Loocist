// usePopularMovies.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export const usePopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`${config.API_ROOT_URL}/movie/popular?api_key=${config.API_KEY}&page=${page}`)
      .then((response) => {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);

  const handlePressMovieCard = (movieId) => {
    setSelectedMovieId(movieId);
    setIsModalVisible(true);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { movies, isModalVisible, selectedMovieId, handlePressMovieCard, handleLoadMore, setIsModalVisible };
};

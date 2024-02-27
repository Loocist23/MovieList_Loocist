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
        const newMovies = response.data.results.filter(newMovie => 
          !movies.some(existingMovie => existingMovie.id === newMovie.id)
        );

        if (newMovies.length > 0) {
          setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        }
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

// useNewsMovies.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export const useNewsMovies = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('now_playing');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      let API_URL = `${config.API_ROOT_URL}/movie/${category}?api_key=${config.API_KEY}&page=${page}`;
      try {
        const response = await axios.get(API_URL);
        // Réinitialisez les films seulement si page est à 1, pour gérer à la fois le changement de catégorie et le chargement plus
        if (page === 1) {
          setMovies(response.data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
      }
    };

    fetchMovies();
  }, [category, page]);

  useEffect(() => {
    // Réinitialisez la page à 1 chaque fois que la catégorie change
    setPage(1);
  }, [category]);

  const openMovieDetailsModal = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const closeMovieDetailsModal = () => {
    setSelectedMovieId(null);
  };

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { movies, category, selectedMovieId, setCategory, openMovieDetailsModal, closeMovieDetailsModal, loadMoreMovies };
};

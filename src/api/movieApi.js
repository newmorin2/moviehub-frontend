import axios from "axios";
import {movies as mockMovies} from "../data/movies"

// const API_URL = "http://localhost:8000";

export const getMovies = async () => {
  return Promise.resolve(mockMovies);
};

export const getMovieById = async (id) => {
  const movie = mockMovies.find(
    (movie) => movie.id === Number(id)
  );

  return Promise.resolve(movie);
};
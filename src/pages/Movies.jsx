import { useEffect, useState } from "react";
import { getMovies } from "../utils/helpers";
import { movies } from "../data/movies";
import SearchBar from "../components/movies/SearchBar";
import MovieList from "../components/movies/MovieList";
import Loader from "../components/standard/Loader";

import useMovies from "../hooks/useMovies";

export default function Movies() {
  const { movies, loading, error } = useMovies();
//   const [movies,setMovies] = useState([])
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    getMovies()
      .then(data => setMovies(data))
      .catch(err => console.error(err));
  }, []);
  
  const filtered = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );
  const handleDeleteMovie = (id) => {
  setMovies((prevMovies) =>
    prevMovies.filter((movie) => movie.id !== id)
    );
    };
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-6">
        Movies
      </h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <MovieList movies={filtered} />
       {movies.map(movie => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.genre}</p>
        </div>
      ))}
      
    </div>
  );
}
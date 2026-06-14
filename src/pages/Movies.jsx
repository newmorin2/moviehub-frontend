import { useState } from "react";

import SearchBar from "../components/movies/SearchBar";
import MovieList from "../components/movies/MovieList";
import Loader from "../components/standard/Loader";

import useMovies from "../hooks/useMovies";

export default function Movies() {
  const { movies, loading, error } = useMovies();
//   const [movies,setMovies] = useState([])
  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter((movie) =>
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

      <div className="mt-6">
        <MovieList movies={filteredMovies} onDelete={handleDeleteMovie} />
      </div>
    </div>
  );
}
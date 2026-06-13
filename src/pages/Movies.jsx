import { useState } from "react";
import { movies } from "../data/movies";

import SearchBar from "../components/movies/SearchBar";
import MovieList from "../components/movies/MovieList";

export default function Movies() {
  const [search, setSearch] = useState("");

  const filtered = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-red-600  to-gray-950">
      <h1 className="text-3xl font-bold mb-4">Movies</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <MovieList movies={filtered} />
    </div>
  );
}
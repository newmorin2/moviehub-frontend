import { useEffect, useState } from "react";
import { getMovies } from "../utils/helpers";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Movies
      </h1>

      {movies.map((movie) => (
        <div
          key={movie.id}
          className="border p-4 mb-4 rounded"
        >
          <h2 className="text-xl font-bold">
            {movie.title}
          </h2>

          <p>{movie.genre}</p>

          <p>{movie.description}</p>

          <p>{movie.release_year}</p>

          <p>{movie.rating}</p>
        </div>
      ))}
    </div>
  );
}
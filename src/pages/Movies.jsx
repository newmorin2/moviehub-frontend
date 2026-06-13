import { useEffect, useState } from "react";
import { getMovies } from "../utils/helpers";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies()
      .then(data => setMovies(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.genre}</p>
        </div>
      ))}
    </div>
  );
}

export default Movies;
import { useParams } from "react-router-dom";
import { movies } from "../data/movies";

function MovieDetails() {
  const { id } = useParams();

  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-gray-950 p-6">
      <div className="max-w-3xl mx-auto">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full rounded"
        />

        <h1 className="text-2xl font-bold mt-3 text-white">
          {movie.title}
        </h1>

        <p className="text-gray-300">{movie.genre}</p>

        <p className="mt-2 text-white">
          {movie.description}
        </p>
      </div>
    </div>
  );
}

export default MovieDetails;
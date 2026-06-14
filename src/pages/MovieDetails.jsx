import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../components/standard/Loader";
import { getMovieById } from "../api/movieApi";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

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

  if (!movie) {
    return (
      <div className="text-center mt-10">
        Movie not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full rounded-lg shadow-lg"
      />

      <h1 className="text-4xl font-bold mt-6">
        {movie.title}
      </h1>

      <p className="text-gray-600 mt-2">
        {movie.genre}
      </p>

      <p className="text-gray-600">
        Duration: {movie.duration}
      </p>

      <p className="mt-4 text-lg">
        {movie.description}
      </p>
    </div>
  );
}
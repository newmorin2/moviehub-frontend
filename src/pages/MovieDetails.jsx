import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Loader from "../components/standard/Loader";
import { getMovieById } from "../api/movieApi";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300 transition"
        >
          Back
        </button>
        <Link
          to={`/booking/${movie.id}`}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Book Tickets
        </Link>
      </div>

      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full rounded-lg shadow-lg"
        onError={(e) => {
          e.target.src = "https://picsum.photos/800/400";
        }}
      />

      <div className="space-y-4">
        <h1 className="text-4xl font-bold">
          {movie.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-gray-600">
          <span>Genre: {movie.genre}</span>
          <span>Duration: {movie.duration}</span>
          <span>Price: {movie.price ? `Ksh ${movie.price}` : "N/A"}</span>
        </div>

        <p className="mt-2 text-lg text-gray-300">
          {movie.description}
        </p>
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8000/movies";

export default function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL);

      setMovies(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${movieId}`);

      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );

      alert("Movie deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete movie");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100">
        <h2 className="text-2xl font-semibold text-slate-700">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  const totalMovies = movies.length;

  const totalGenres = new Set(
    movies.map((movie) => movie.genre)
  ).size;

  const averageRating =
    movies.length > 0
      ? (
          movies.reduce(
            (sum, movie) => sum + (movie.rating || 0),
            0
          ) / movies.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Admin Dashboard
          </h1>
          <p className="text-slate-500">
            Manage all movies in MovieHub
          </p>
        </div>

        <Link
          to="/admin/add"
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg shadow-md transition"
        >
          + Add Movie
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm uppercase">
            Total Movies
          </h3>

          <p className="text-4xl font-bold text-slate-800 mt-2">
            {totalMovies}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm uppercase">
            Genres
          </h3>

          <p className="text-4xl font-bold text-slate-800 mt-2">
            {totalGenres}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm uppercase">
            Average Rating
          </h3>

          <p className="text-4xl font-bold text-slate-800 mt-2">
             {averageRating}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Empty State */}
      {movies.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-2xl font-semibold">
            No Movies Found
          </h2>

          <p className="text-gray-500 mt-2">
            Start by adding your first movie.
          </p>

          <Link
            to="/admin/add"
            className="inline-block mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Add Movie
          </Link>
        </div>
      ) : (
        <>
          {/* Movies Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">
              Movie Library
            </h2>

            <span className="text-gray-500">
              {movies.length} Movies
            </span>
          </div>

          {/* 4 Movies Per Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                {/* Poster */}
                <img
                  src={
                    movie.poster ||
                    "https://via.placeholder.com/400x600"
                  }
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-slate-800 truncate">
                    {movie.title}
                  </h2>

                  <p className="text-sm text-red-600 font-medium">
                    {movie.genre}
                  </p>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {movie.description}
                  </p>

                  {/* Movie Info */}
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span>
                       {movie.rating || "N/A"}
                    </span>

                    <span>
                      {movie.release_year || "N/A"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Link
                      to={`/admin/edit/${movie.id}`}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 rounded-lg text-sm font-medium transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDeleteMovie(movie.id)
                      }
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
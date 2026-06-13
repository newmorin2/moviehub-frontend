// src/pages/admin/AdminDashboard.jsx

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
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold">Loading movies...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Admin Dashboard
            </h1>
            <p className="text-slate-500">
              Manage movies in the system
            </p>
          </div>

          <Link
            to="/admin/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
          >
            + Add Movie
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {movies.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              No Movies Found
            </h2>
            <p className="text-gray-500 mb-4">
              Start by adding your first movie.
            </p>

            <Link
              to="/admin/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Movie
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Poster */}
                <img
                  src={
                    movie.poster ||
                    "https://via.placeholder.com/400x600"
                  }
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-xl font-bold text-slate-800 mb-2">
                    {movie.title}
                  </h2>

                  <p className="text-sm text-gray-500 mb-2">
                    {movie.genre}
                  </p>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {movie.description}
                  </p>

                  <div className="mt-4 flex justify-between text-sm">
                    <span>
                      ⏱ {movie.duration} min
                    </span>

                    <span className="font-semibold text-green-600">
                      ${movie.price}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex flex-col md:flex-row gap-2">
                    <Link
                      to={`/admin/edit/${movie.id}`}
                      className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDeleteMovie(movie.id)
                      }
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
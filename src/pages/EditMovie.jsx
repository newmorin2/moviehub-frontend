import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieForm from "../components/admin/MovieForm";

const API_URL = "http://localhost:8000";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/movies/${id}`);
        setMovie(response.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleUpdate = async (updatedMovie) => {
    try {
      setSaving(true);
      await axios.put(`${API_URL}/movies/${id}/`, updatedMovie);
      alert("Movie updated successfully");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Failed to update movie. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100">
        <h2 className="text-2xl font-semibold text-slate-700">Loading movie...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Edit Movie</h1>

        <MovieForm
          initialData={movie}
          buttonText={saving ? "Saving..." : "Update Movie"}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
}

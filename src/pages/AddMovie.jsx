import { useState } from "react";
import axios from "axios";

export default function AddMovie() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    description: "",
    release_year: "",
    rating: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/movies/",
        {
          ...formData,
          price: Number(formData.price),
          release_year: Number(formData.release_year),
          rating: Number(formData.rating),
        }
      );

      console.log(response.data);
      alert("Movie added successfully!");

      setFormData({
        title: "",
        genre: "",
        description: "",
        price: "",
        release_year: "",
        rating: "",
      });
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
        alert(
          JSON.stringify(error.response.data, null, 2)
        );
      } else {
        alert("Failed to connect to server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-linear-to-b">
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Add Movie
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          step="0.01"
          min="0"
          name="price"
          placeholder="Ticket Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="release_year"
          placeholder="Release Year"
          value={formData.release_year}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="rating"
          placeholder="Rating (0-10)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Movie"}
        </button>
      </form>
    </div>
   </div>
  );
}
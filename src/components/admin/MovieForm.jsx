// src/components/movies/MovieForm.jsx

import { useState } from "react";

export default function MovieForm({
  initialData = {},
  onSubmit,
  buttonText = "Save Movie",
}) {
  const [movie, setMovie] = useState({
    title: initialData.title || "",
    genre: initialData.genre || "",
    description: initialData.description || "",
    duration: initialData.duration || "",
    price: initialData.price || "",
    poster: initialData.poster || "",
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movie);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">
          Movie Title
        </label>

        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Genre */}
      <div>
        <label className="block mb-1 font-medium">
          Genre
        </label>

        <input
          type="text"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">
          Description
        </label>

        <textarea
          name="description"
          value={movie.description}
          onChange={handleChange}
          rows="4"
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Duration */}
      <div>
        <label className="block mb-1 font-medium">
          Duration (minutes)
        </label>

        <input
          type="number"
          name="duration"
          value={movie.duration}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="block mb-1 font-medium">
          Ticket Price
        </label>

        <input
          type="number"
          step="0.01"
          name="price"
          value={movie.price}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Poster */}
      <div>
        <label className="block mb-1 font-medium">
          Poster URL
        </label>

        <input
          type="text"
          name="poster"
          value={movie.poster}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Preview */}
      {movie.poster && (
        <div>
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-40 rounded-lg"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {buttonText}
      </button>
    </form>
  );
}
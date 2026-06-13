import { useState } from "react";
import axios from "axios";

export default function AddMovie() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    description: "",
    duration: "",
    price: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8000/movies",
      formData
    );

    alert("Movie added");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Add Movie
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="title"
          placeholder="Movie title"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="genre"
          placeholder="Genre"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="duration"
          placeholder="Duration"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Save Movie
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
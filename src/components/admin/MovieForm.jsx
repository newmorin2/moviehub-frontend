import { deleteMovie } from "../../api/movieApi";

export default function MovieCard({ movie, onDelete }) {

  const handleDelete = async () => {
    try {
      await deleteMovie(movie.id);
      onDelete(movie.id); // update UI
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">

      <img src={movie.poster} className="h-60 w-full object-cover" />

      <h2 className="text-lg font-bold mt-2">
        {movie.title}
      </h2>

      {/* ADMIN ONLY */}
      <button
        onClick={handleDelete}
        className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>

    </div>
  );
}
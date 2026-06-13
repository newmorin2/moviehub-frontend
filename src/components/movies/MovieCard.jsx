import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-72 object-cover"
      />

      <div className="p-3">
        <h2 className="font-bold">{movie.title}</h2>
        <p className="text-sm text-gray-500">{movie.genre}</p>

        <Link
          to={`/movies/${movie.id}`}
          className="inline-block mt-2 bg-blue-600 text-white px-3 py-1 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
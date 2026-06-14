import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden border-2 border-red-600 transition-all duration-300 hover:scale-101 hover:shadow-xl hover:border-red-500 cursor-pointer">

      <img
        src={movie.poster || "https://unsplash.com/photos/gold-pyramid-on-brown-wooden-table-LiLPRqxWI9I"} 
        alt={movie.title}
        className="w-full h-72 object-cover"
        onError={(e) => {
          e.target.src = "https://picsum.photos/300/450";
        }}
      />

      <div className="p-3">
        <h2 className="font-bold">{movie.title}</h2>
        <p className="text-sm text-gray-500">{movie.genre}</p>

        <Link
          to={`/movies/${movie.id}`}
          className="inline-block mt-2 bg-red-600 text-white px-3 py-1 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
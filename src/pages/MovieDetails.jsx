import { useParams } from "react-router-dom";
import { movies } from "../data/movies";

function MovieDetails(){
  const { id } = useParams();
    return(
        <>
         <div className="min-h-screen bg-linear-to-b from-red-600  to-gray-950">

         </div>
        </>
    )
}

  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) return <h2>Movie not found</h2>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={movie.poster} className="w-full rounded" />
      <h1 className="text-2xl font-bold mt-3">{movie.title}</h1>
      <p className="text-gray-600">{movie.genre}</p>
      <p className="mt-2">{movie.description}</p>
    </div>
  );
}
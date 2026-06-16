import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-linear-to-r from-red-600 to-red-400 text-white py-16 px-6 rounded-b-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Discover Your Next Movie</h1>
          <p className="mb-6 text-lg">Browse top picks, latest releases, and personal recommendations.</p>

          <div className="flex gap-3">
            <Link to="/movies" className="bg-white text-red-600 px-5 py-3 rounded font-semibold">Browse Movies</Link>
            <Link to="/register" className="border border-white px-5 py-3 rounded">Join</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

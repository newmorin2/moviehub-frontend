import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logOut } = useAuth();

  return (
    <nav className="bg-red-700 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-red-200"
        >
          MovieHub
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/">Home</Link>

          <Link to="/movies">Movies</Link>

          {user && (
            <Link to="/my-bookings">
              My Bookings
            </Link>
          )}

          {/* Admin Button */}
          {!user && (
            <Link
  to="/admin/login"
  className="bg-black px-4 py-2 rounded-lg hover:bg-gray-800"
>
  Admin
</Link>
          )}

          {user ? (
            <button
              onClick={logOut}
              className="bg-white text-red-700 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-red-700 px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
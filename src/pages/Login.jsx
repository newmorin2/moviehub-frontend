import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { logIn, logOut, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      if (result.user.email === "admin@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/movies");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      setError("Google Sign-In failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await logIn(email, password);

      if (result.user.email === "admin@gmail.com") {
        setError("Please use the Admin Login page.");
        await logOut();
        return;
      }

      navigate("/movies");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-gray-950 grid md:grid-cols-2 gap-10 p-6">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-black/20 p-6 rounded-xl text-white"
        >
          <h2 className="font-bold text-3xl text-center">
            LOGIN TO YOUR ACCOUNT
          </h2>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded">
              {error}
            </div>
          )}

          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type your email..."
            className="border rounded-md px-3 py-2 text-white bg-transparent"
          />

          <label>Password</label>
          <input
            type={passwordVisibility ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password..."
            className="border rounded-md px-3 py-2 text-white bg-transparent"
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded"
          >
            {passwordVisibility ? "Hide Password" : "Show Password"}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-black hover:bg-gray-800 text-white font-bold p-3 rounded"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="bg-red-600 hover:bg-red-500 text-white font-bold p-3 rounded"
          >
            Sign in with Google
          </button>

          <div className="text-center">
            <Link
              to="/admin-login"
              className="text-red-300 hover:underline"
            >
              Admin Login
            </Link>
          </div>
        </form>
      </div>

      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 flex items-center justify-center">
        <div className="bg-white/30 rounded-2xl p-10 text-center w-full">
          <h1 className="text-2xl font-semibold text-black">
            WELCOME BACK TO
          </h1>

          <h1 className="text-5xl font-extrabold text-black my-4">
            MovieHub
          </h1>

          <p className="text-xl text-black">
            Please login to continue.
          </p>

          <div className="bg-black/20 rounded-xl p-4 mt-6">
            <p className="text-lg text-black mb-2">
              Are you new here?
            </p>

            <Link
              to="/register"
              className="text-red-600 font-bold hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
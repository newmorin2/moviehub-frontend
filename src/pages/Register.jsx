import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register(){
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signUp(email, password);
      navigate("/login"); 
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/"); // Redirect to homepage on success
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  const togglePasswordVisibility = () =>{
        setPasswordVisibility((p) => !p);
    };


    return(
        <>
        <div className="min-h-screen bg-linear-to-b from-red-600 to-gray-1050 flex items-center justify-center px-6 py-10">
  
  <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">

    <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
      
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-white"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </h2>

        <label className="text-sm">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-md text-black outline-none border focus:ring-2 focus:ring-red-500"
          placeholder="Enter your email"
        />

        <label className="text-sm">Password</label>
        <input
          type={passwordVisibility ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-md text-black outline-none border focus:ring-2 focus:ring-red-500"
          placeholder="Enter your password"
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-sm text-red-200 hover:text-white self-start"
        >
          {passwordVisibility ? "Hide password" : "Show password"}
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-800 hover:bg-gray-900 transition text-white font-bold py-2 rounded-md mt-2"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-red-500 hover:bg-red-600 transition text-white font-bold py-2 rounded-md"
        >
          Sign up with Google
        </button>
      </form>
    </div>

    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col justify-center text-center text-white">

      <h1 className="text-xl font-light">
        Welcome to
      </h1>

      <h1 className="text-5xl font-extrabold text-red-500 my-2">
        MovieHub
      </h1>

      <p className="text-lg text-gray-200 mb-6">
        Book, Enjoy 
      </p>

      <div className="bg-black/30 rounded-xl p-5">
        <p className="text-lg mb-2">
          Already a member?
        </p>

        <Link
          to="/login"
          className="text-red-400 font-bold hover:underline"
        >
          Login here
        </Link>
      </div>

    </div>
  </div>
</div>
        </>
    )
}

export default Register;
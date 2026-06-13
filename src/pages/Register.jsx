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
        <div className="min-h-screen bg-linear-to-b from-red-600  to-gray-950 grid grid-cols-2 gap-20">
            <div className="bg-white/50 rounded-2xl m-15 max-w-3xl p-5 max-h-fit">
                <form onSubmit={handleSubmit} className="text-white rounded-xl flex flex-col gap-5 m-1 bg-black/20 p-7">
                    <h2 className="font-bold text-2xl text-black">
                        Register your account
                    </h2>
                    <label htmlFor="email">Enter your email:</label>
                    <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2 focus:bg-white/30 w-full focus:border-blue-500"
                    placeholder="Type your email..." />
                    <label htmlFor="password">Enter your password:</label>
                    <input 
                    type={passwordVisibility ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2 focus:bg-white/30 w-full focus:border-blue-500"
                    placeholder="Type your password..." />
                    <button
                       type="button"
                       onClick={togglePasswordVisibility}
                    >
                        {passwordVisibility ? 'Hide password' : 'Show password'}
                    </button>
                    <button 
                    type="submit"
                    className="bg-black text-white font-bold p-2"
                    disabled={loading}>
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                    <button
                 type="button"
                 className="bg-red-600 hover:bg-red-400 text-white font-bold p-4"
                 onClick={handleGoogleSignIn}>
                    Sign up with Google
                </button>
                </form>
                
            </div>
            <div className="bg-white/50 border-white/60 rounded-2xl max-w-3xl m-15 p-8 max-h-fit">
                <div className="bg-white/50 rounded-2xl m-20 p-10 text-center">
                <h1 className="text-2xl font-semibold"> 
                    Welcome to
                </h1>
                <h1 className="text-4xl font-extrabold p-3">
                    MovieHub
                </h1>
                <p className="text-2xl">Please register to continue.</p>
                <div className="bg-black/20 rounded-2xl p-3 m-3">
                    <p className="text-2xl">Already a member?</p>
                    <Link to="/login" className="underline decoration-transparent transition duration-300 hover:decoration-inherit text-red-500">
                      login
                    </Link>
                </div>
                </div>
            </div>
        </div>        
        </>
    )
}

export default Register;
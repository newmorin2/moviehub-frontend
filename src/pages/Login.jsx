import React, {useState} from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login(){
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { logIn } = useAuth();
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/"); 
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
        await logIn(email, password);
        navigate("/"); 
        } catch (err) {
        setError("Failed to log in. Please check your credentials.");
        } finally {
        setLoading(false);
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
                        LOGIN TO YOUR ACCOUNT
                    </h2>
                    <label htmlFor="username">Enter your Email:</label>
                    <input 
                    type="text" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2 focus:bg-white/30 w-full focus:border-red-500 focus:ring-1"
                    placeholder="Type your email..." />
                    <label htmlFor="password">Enter your password:</label>
                    <input 
                    type={passwordVisibility ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2 focus:bg-white/30 w-full focus:border-red-500 focus:ring-1"
                    placeholder="Type your password..." />
                    <button
                       type="button"
                       className="bg-black/30 text-white font-bold p-2"
                       onClick={togglePasswordVisibility}
                    >
                        {passwordVisibility ? 'Hide password' : 'Show password'}
                    </button>
                    <button 
                    className="bg-black text-white font-bold p-2"
                    type="submit">
                        {loading ? "Logging In..." : "Log In"}
                    </button>
                    <button
                        type="button" 
                        className="bg-red-600 hover:bg-red-400 text-white font-bold p-4"
                        onClick={handleGoogleSignIn}>
                            Sign in with Google
                    </button>
                </form>
                
            </div>
            <div className="bg-white/50 border-white/60 rounded-2xl max-w-3xl m-15 p-8 max-h-fit">
                <div className="bg-white/50 rounded-2xl m-20 p-10 text-center">
                <h1 className="text-2xl font-semibold">
                    WELCOME BACK TO
                </h1>
                <h1 className="text-4xl font-extrabold p-3">
                    MovieHub
                </h1>
                <p className="text-2xl">Please Login to continue.</p>
                <div className="bg-black/20 rounded-2xl p-3 m-3">
                    <p className="text-2xl">Are you new here?</p>
                    <Link to="/register" className="underline decoration-transparent transition duration-300 hover:decoration-inherit text-red-500">
                       Register
                    </Link>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;
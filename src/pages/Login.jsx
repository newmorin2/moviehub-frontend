import React, {useState} from "react";

function Login(){
    [passwordVisibility, setPasswordVisibility] = useState("")

    const togglePasswordVisibility = () =>{
        setPasswordVisibility((p) => !p);
    };

    return(
        <>
        <div>
            <div>
                <form >
                    <h2>
                        Login to your account
                    </h2>
                    <label htmlFor="username">Enter your Username:</label>
                    <input 
                    type="text" 
                    placeholder="Type your username..." />
                    <label htmlFor="password">Enter your password:</label>
                    <input 
                    type="password"
                    placeholder="Type your password..." />
                    <button
                       type="button"
                       onClick={togglePasswordVisibility}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                    <button type="submit">Login</button>
                </form>
            </div>
            <div>
                <div>
                <h1>
                    Welcome to
                </h1>
                <h1>
                    MovieHub
                </h1>
                <p>Please Login to continue.</p>
                <p>Are you new here?</p>
                <div>
                    
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;
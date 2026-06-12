import React from "react";

function Register(){
    return(
        <>
        <div>
            <div>
                <form onSubmit={}>
                    <h2>
                        Register your account
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
                    <label htmlFor="email">Enter your email:</label>
                    <input 
                    type="email" 
                    placeholder="TYpe your email..." />
                    <button type="submit">Login</button>
                </form>
                <button onClick={}>
                    Sign in with Google
                </button>
            </div>
            <div>
                <div>
                <h1>
                    Welcome to
                </h1>
                <h1>
                    MovieHub
                </h1>
                <p>Please register to continue.</p>
                <p>Already a member?</p>
                <div>

                </div>
                </div>
            </div>
        </div>        
        </>
    )
}

export default Register;
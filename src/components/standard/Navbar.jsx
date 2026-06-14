import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

function Navbar(){
    const { user, logOut } = useAuth();

    const isAdmin = user?.email === "admin@gmail.com";
    return(
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/movies">Movies</Link>
                {user && <Link to="/mybookings">My Bookings</Link>}
                {isAdmin && (
                    <>
                        <Link to="/admindashboard">Admin Panel</Link>
                        <Link to="/addmovie">Add Movie</Link>
                    </>
                )}
                <button onClick={logOut} >Logout</button>
            </nav>
        </>
    )
}

export default Navbar;
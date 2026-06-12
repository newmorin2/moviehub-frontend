import React from "react";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router";
import { Link } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyBookings from "../pages/MyBookings";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import AddMovie from "../pages/AddMovie";
import AdminDashboard from "../pages/AdminDashboard";
import Home from "../pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import Navbar from "../components/standard/Navbar";


const AppRoutes = () => {
    return(
        <>
            {location.pathname !== '/login' && location.pathname !== '/register' && (
                <Navbar />
            )}

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<ProtectedRoutes userName={userName}>
                <Movies />
            </ProtectedRoutes>} />
            <Route path="/moviedetails" element={<ProtectedRoutes userName={userName}>
                <MovieDetails />
            </ProtectedRoutes>} />
            <Route path="/addmovie" element={<ProtectedRoutes userName={userName}>
                <AddMovie />
            </ProtectedRoutes>} />
            <Route path="/admindashboard" element={<ProtectedRoutes userName={userName}>
                <AdminDashboard />
            </ProtectedRoutes>} />
        </Routes>
       </> 
    )
}

export default AppRoutes
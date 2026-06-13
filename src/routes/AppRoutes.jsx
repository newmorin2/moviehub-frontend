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
import AdminRoute from "./AdminRoutes";
import Navbar from "../components/standard/Navbar";


const AppRoutes = () => {
    return(
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<ProtectedRoutes >
                <Movies />
            </ProtectedRoutes>} />
            <Route path="/mybookings" element={<ProtectedRoutes ><MyBookings /></ProtectedRoutes>} />
            <Route path="/addmovie" element={<AdminRoute ><AddMovie /></AdminRoute>} />
            <Route path="/admindashboard" element={<AdminRoute ><AdminDashboard /></AdminRoute>} />
        </Routes>
       </> 
    )
}

export default AppRoutes
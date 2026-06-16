import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register"
import MyBookings from "../pages/MyBookings"
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import AddMovie from "../pages/AddMovie";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLogin from "../pages/AdminLogin";

import AdminLayout from "../components/admin/AdminLayout";

import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoute from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddMovie />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/my-bookings" element={<MyBookings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
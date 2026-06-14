import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register"
import MyBookings from "../pages/MyBookings"
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import AddMovie from "../pages/AddMovie";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLogin from "../pages/AdminLogin";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyBookings from "../pages/MyBookings";

// Admin Layout
import AdminLayout from "../components/admin/AdminLayout";

// Guards
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoute from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected Routes */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddMovie />} />
        </Route>
      </Route>

      {/* User Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/my-bookings" element={<MyBookings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
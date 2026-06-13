import { Routes, Route } from "react-router-dom";

import Navbar from "./components/standard/Navbar";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import AdminDashboard from "./pages/AdminDashboard";
import AddMovie from "./pages/AddMovie";

function App() {
  return (
    <>
      <Navbar />

<Routes>
  <Route path="/" element={<Home />} />
 
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/admin/add" element={<AddMovie />} />
</Routes>
    </>
  );
}

export default App;
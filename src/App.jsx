import React from "react"
import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/standard/Navbar"
import { AuthProvider,useAuth } from "./context/AuthContext"

function AppContent(){
  const { user } = useAuth

  return(
    <div>
      {user && <Navbar />}
      <main>
        <AppRoutes />
      </main>
    </div>
  )

}


import Home from "./pages/Home";
import Movies from "./pages/Movies";
import AdminDashboard from "./pages/AdminDashboard";
import AddMovie from "./pages/AddMovie";

function App() {
  return (
    <>
      <AuthProvider>
          <div>
            <AppContent />
          </div>
      </AuthProvider>
    </>
  );
}

export default App;
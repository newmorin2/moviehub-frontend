import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
      
        <Link to="/admin">Admin Dashboard</Link>
      </nav>

      <div className="p-6">
        <h1 className="text-3xl font-bold">MovieHub</h1>
        <p>Welcome to MovieHub.</p>
      </div>
    </>
  );
}

export default Home;

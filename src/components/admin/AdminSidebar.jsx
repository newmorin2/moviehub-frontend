// src/components/admin/AdminSidebar.jsx

import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">
        MovieHub 
      </h1>

      <nav className="flex flex-col gap-4">
        <Link
          to="/admin"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/add"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Add Movie
        </Link>
      </nav>
    </aside>
  );
}
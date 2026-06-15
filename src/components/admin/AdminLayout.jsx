import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-slate-100">
      <AdminSidebar />

      <div className="flex-1">
        <AdminNavbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
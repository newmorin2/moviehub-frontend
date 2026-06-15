import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar() {
  const { user, logOut } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">
        Admin Panel
      </h2>

      <div className="flex items-center gap-4">
        <span>{user?.email}</span>

        <button
          onClick={logOut}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
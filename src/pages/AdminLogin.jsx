import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const { logIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await logIn(email, password);

      if (result.user.email !== "admin@gmail.com") {
        alert("Access denied. Admin only.");
        return;
      }

      navigate("/admin");
    } catch (error) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          className="bg-red-600 text-white w-full p-2 rounded"
          type="submit"
        >
          Login as Admin
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Enter username");
      return;
    }
    if (!password) {
      setError("Enter password");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        { username, password },
        { withCredentials: true } // required to accept cookies
      );

      if (res.data.success) {
        // Successful login
        setError("");
        navigate("/"); // redirect to dashboard
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md bg-[#111] rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          Admin Login
        </h1>

        {error && (
          <p className="text-center text-red-400 mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded-lg bg-black border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg bg-black border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

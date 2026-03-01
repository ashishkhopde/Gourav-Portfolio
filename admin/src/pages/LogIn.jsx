import React, { useState, useEffect } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    try {
      const response = await api.get("/admin/check-auth");

      if (response.data.authenticated) {
        console.log("User already logged in, redirecting to dashboard");
        navigate("/", { replace: true });
      }
    } catch (error) {
      // User not authenticated, stay on login page
      console.log("User not authenticated, staying on login page");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!username) {
      setError("Enter username");
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError("Enter password");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Attempting login to:", `${import.meta.env.VITE_BASE_URL}/admin/login`);

      const res = await api.post(
        "/admin/login",
        { username, password },
        { timeout: 10000 }
      );

      console.log("Login response:", res.data);

      if (res.data.success) {
        if (res.data.token) {
          localStorage.setItem("adminToken", res.data.token);
        }
        // console.log("Login successful, verifying authentication...");

        // Verify authentication before redirecting
        try {
          const authCheck = await api.get(
            "/admin/check-auth",
            { timeout: 5000 }
          );

          if (authCheck.data.authenticated) {
            console.log("Authentication verified, redirecting to dashboard");
            navigate("/", { replace: true });
          } else {
            setError("Login successful but session not created. Please try again.");
          }
        } catch (authError) {
          console.error("Auth verification failed:", authError);
          setError("Login successful but session verification failed. Please try again.");
        }

      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else if (error.code === 'ECONNREFUSED') {
        setError("Cannot connect to server. Make sure the backend is running.");
      } else if (error.code === 'ECONNABORTED') {
        setError("Request timeout. Please check your connection and try again.");
      } else {
        setError("Server error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-black">
      <div className="w-full max-w-md bg-[#111] rounded-2xl shadow-xl p-8">
        <h1 className="mb-6 text-3xl font-bold text-center text-red-500">
          Admin Login
        </h1>

        {error && (
          <div className="p-3 mb-4 font-medium text-center text-red-400 border rounded-lg bg-red-500/10 border-red-500/30">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 text-white bg-black border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 text-white bg-black border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-all duration-300 bg-red-500 rounded-lg shadow-lg hover:bg-red-600 disabled:bg-red-700 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

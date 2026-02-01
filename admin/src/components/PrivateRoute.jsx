import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "../config/api";

export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    checkAuthentication();
  }, [location.pathname]); // Re-check when route changes

  const checkAuthentication = async () => {
    try {
      console.log("PrivateRoute: Checking authentication...");

      const response = await api.get(
        "/admin/check-auth",
        {
          timeout: 5000 // Add timeout to prevent hanging
        }
      );

      console.log("PrivateRoute: Auth check response:", response.data);

      if (response.data.authenticated) {
        setIsAuthenticated(true);
        console.log("PrivateRoute: User is authenticated");
      } else {
        setIsAuthenticated(false);
        console.log("PrivateRoute: User is not authenticated");
      }
    } catch (error) {
      console.log("PrivateRoute: Auth check failed:", error.response?.data || error.message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg">Checking authentication...</div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log("PrivateRoute: Redirecting to login");
    return <Navigate to="/login" replace />;
  }

  console.log("PrivateRoute: Rendering protected content");
  return children;
}

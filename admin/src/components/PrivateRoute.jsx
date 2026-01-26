import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoute({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []); // runs once on mount

  // While checking cookie, you can render null or loading
  if (token === null) return null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

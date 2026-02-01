import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../config/api";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Navigation function
  const handleNavClick = (path) => {
    setIsOpen(false);
    if (location.pathname !== path) navigate(path);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await api.post("/admin/logout");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always redirect to login, even if logout API fails
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-lg shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1
          onClick={() => handleNavClick("/")}
          className="text-2xl md:text-3xl font-bold text-red-500 cursor-pointer"
        >
          🎥 Sachin<span className="text-white">Editz</span>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center text-gray-200 font-medium">
          <button
            onClick={() => handleNavClick("/message")}
            className={`hover:text-red-500 transition-all duration-300 ${location.pathname === "/message" ? "text-red-500" : ""
              }`}
          >
            Messages
          </button>
          <button
            onClick={() => handleNavClick("/video")}
            className={`hover:text-red-500 transition-all duration-300 ${location.pathname === "/video" ? "text-red-500" : ""
              }`}
          >
            Videos
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 text-gray-300 flex flex-col items-center space-y-4 py-6">
          <button
            onClick={() => handleNavClick("/")}
            className={`hover:text-red-500 ${location.pathname === "/" ? "text-red-500" : ""
              }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("/message")}
            className={`hover:text-red-500 ${location.pathname === "/message" ? "text-red-500" : ""
              }`}
          >
            Messages
          </button>
          <button
            onClick={() => handleNavClick("/video")}
            className={`hover:text-red-500 ${location.pathname === "/video" ? "text-red-500" : ""
              }`}
          >
            Videos
          </button>

          {/* Mobile Logout */}
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../config/api";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (location.pathname !== path) navigate(path);
  };

  const handleLogout = async () => {
    try {
      await api.post("/admin/logout");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full shadow-md bg-black/70 backdrop-blur-lg">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl md:px-10">
        {/* Logo */}
        <h1
          onClick={() => handleNavClick("/")}
          className="text-2xl font-bold text-red-500 cursor-pointer md:text-3xl"
        >
          🎥 Sachin<span className="text-white">Editz</span>
        </h1>

        {/* Desktop Links */}
        <div className="items-center hidden space-x-6 font-medium text-gray-200 md:flex">
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

          <button
            onClick={() => handleNavClick("/infos")}
            className={`hover:text-red-500 transition-all duration-300 ${location.pathname === "/infos" ? "text-red-500" : ""
              }`}
          >
            Infos
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 ml-4 font-semibold text-white transition-all duration-300 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-2xl text-white md:hidden focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col items-center py-6 space-y-4 text-gray-300 md:hidden bg-black/90">
          <button
            onClick={() => handleNavClick("/")}
            className={`hover:text-red-500 ${location.pathname === "/" ? "text-red-500" : ""}`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick("/message")}
            className={`hover:text-red-500 ${location.pathname === "/message" ? "text-red-500" : ""}`}
          >
            Messages
          </button>

          <button
            onClick={() => handleNavClick("/video")}
            className={`hover:text-red-500 ${location.pathname === "/video" ? "text-red-500" : ""}`}
          >
            Videos
          </button>

          <button
            onClick={() => handleNavClick("/infos")}
            className={`hover:text-red-500 ${location.pathname === "/infos" ? "text-red-500" : ""}`}
          >
            Infos
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 mt-4 font-semibold text-white transition-all duration-300 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

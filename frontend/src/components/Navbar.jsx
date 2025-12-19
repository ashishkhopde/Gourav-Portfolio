import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]"); // only sections with IDs
      let currentSection = "";
      const scrollPos = window.scrollY + window.innerHeight / 3; // earlier trigger for smooth change

      sections.forEach((section) => {
        const { top, height } = section.getBoundingClientRect();
        const sectionTop = window.scrollY + top;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + height) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    // Listen + cleanup
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // set initial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Work" },
    { id: "contact", label: "Contact" },
  ];

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = -70; // adjust for fixed navbar height
    const elementPos = el.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-md bg-black/40
        shadow-md border-b border-white/10
        transition-all duration-300
      "
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          onClick={() => handleScrollTo("home")}
          className="text-2xl font-bold text-white tracking-wide cursor-pointer"
        >
          <span className="text-red-500">G</span>ourav
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <li key={item.id} className="group relative">
              <button
                onClick={() => handleScrollTo(item.id)}
                className={`relative text-sm md:text-base font-medium tracking-wide transition-all duration-300
                  ${activeSection === item.id
                    ? "text-red-500"
                    : "text-gray-200 hover:text-white"
                  }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-red-500 transition-transform duration-300 origin-left
                    ${activeSection === item.id
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                    }
                  `}
                ></span>
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white hover:text-red-400 transition-colors"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-black/70 backdrop-blur-md border-t border-white/10 overflow-hidden transition-all duration-500 ease-in-out
          ${menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <ul className="flex flex-col items-center space-y-4 py-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleScrollTo(item.id)}
                className={`text-lg font-medium transition-all duration-300
                  ${activeSection === item.id
                    ? "text-red-500"
                    : "text-gray-200 hover:text-white"
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

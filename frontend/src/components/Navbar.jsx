import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background based on scroll
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";
      const scrollPos = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const { top, height } = section.getBoundingClientRect();
        const sectionTop = window.scrollY + top;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + height) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector('nav[role="navigation"]');
      if (menuOpen && nav && !nav.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
  ];

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = -70;
    const elementPos = el.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
        ${scrolled 
          ? 'backdrop-blur-md bg-black/80 shadow-lg border-b border-red-500/20' 
          : 'backdrop-blur-sm bg-black/40 border-b border-white/5'
        }
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-8 md:py-6 lg:py-4">
        {/* Logo */}
        <button
          onClick={() => handleScrollTo("home")}
          className="px-2 py-1 text-xl font-bold tracking-wide text-white transition-transform duration-300 rounded-lg outline-none cursor-pointer sm:text-2xl md:text-4xl lg:text-3xl hover:scale-105 focus:outline-none focus:ring-0 md:px-4 lg:px-2 md:py-2 lg:py-1"
          aria-label="Go to home section"
        >
          <span className="text-red-500">S</span>achin
        </button>

        {/* Desktop Menu */}
        <ul className="hidden space-x-6 lg:flex xl:space-x-8">
          {navItems.map((item) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => handleScrollTo(item.id)}
                className={`
                  relative text-sm xl:text-base md:text-xl lg:text-base font-medium tracking-wide transition-all duration-300 px-3 md:px-6 lg:px-3 py-2 md:py-4 lg:py-2 rounded-lg outline-none focus:outline-none focus:ring-0
                  ${activeSection === item.id
                    ? "text-red-500"
                    : "text-gray-200 hover:text-white hover:bg-white/5"
                  }
                `}
                aria-label={`Go to ${item.label} section`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] md:h-[4px] lg:h-[2px] w-full rounded-full bg-red-500 transition-transform duration-300 origin-left
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
          onClick={toggleMenu}
          className="relative z-50 p-2 text-white transition-colors rounded-lg outline-none lg:hidden hover:text-red-400 md:p-4 lg:p-2 hover:bg-white/5 focus:outline-none focus:ring-0"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          {menuOpen ? <X size={24} className="md:w-8 md:h-8 lg:w-6 lg:h-6" /> : <Menu size={24} className="md:w-8 md:h-8 lg:w-6 lg:h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        id="mobile-menu"
        className={`
          lg:hidden bg-black/95 backdrop-blur-md border-t border-red-500/20 overflow-hidden transition-all duration-500 ease-in-out
          ${menuOpen ? "max-h-80 md:max-h-96 lg:max-h-80 opacity-100 visible" : "max-h-0 opacity-0 invisible"}
        `}
        role="menu"
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col items-center px-4 py-4 space-y-1 md:space-y-2 lg:space-y-1 md:py-8 lg:py-4 md:px-8 lg:px-4">
          {navItems.map((item) => (
            <li key={item.id} className="w-full">
              <button
                onClick={() => handleScrollTo(item.id)}
                className={`
                  w-full text-center text-lg md:text-2xl lg:text-lg font-medium transition-all duration-300 py-3 md:py-6 lg:py-3 px-4 md:px-8 lg:px-4 rounded-lg outline-none focus:outline-none focus:ring-0
                  ${activeSection === item.id
                    ? "text-red-500 bg-red-500/10"
                    : "text-gray-200 hover:text-white hover:bg-white/5"
                  }
                `}
                role="menuitem"
                aria-current={activeSection === item.id ? "page" : undefined}
                tabIndex={menuOpen ? 0 : -1}
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

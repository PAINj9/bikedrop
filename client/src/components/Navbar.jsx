import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ small }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logo click: si ya estoy en /main, scrolleo arriba, si no, navego a /main
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/main") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/main");
    }
  };

  // Clicks en anchors inteligentes: si estoy en /main, scrolleo, si no, navego y seteo el anchor
  const handleAnchorClick = (e, anchorId) => {
    e.preventDefault();
    if (location.pathname === "/main") {
      const section = document.getElementById(anchorId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      localStorage.setItem("scrollToAnchor", anchorId);
      navigate("/main");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b shadow-sm transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? "bg-white/90 py-3 shadow-md"
          : `${small ? "py-2" : "py-6"} bg-white/100`
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-20">
        {/* LOGO */}
        <a
          href="/main"
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/Ready1Logo.png"
            alt="BikeDrop logo"
            className={`${
              small ? "h-10" : "h-20"
            } w-auto transition-all duration-300`}
          />
          <span
            className={`font-bold transition-all duration-300 ${
              scrolled
                ? "text-lg"
                : small
                ? "text-xl"
                : "text-2xl"
            }`}
          >
            BikeDrop
          </span>
        </a>
        <nav className="hidden md:flex gap-8 items-center">
          {/* About */}
          <Link
            to="/about"
            className="text-gray-700 hover:text-black transition"
          >
            About
          </Link>
          {/* Services - scroll inteligente */}
          <a
            href="#services"
            onClick={(e) => handleAnchorClick(e, "services")}
            className="text-gray-700 hover:text-black transition"
          >
            Services
          </a>
          {/* Plans - scroll inteligente */}
          <a
            href="#plans"
            onClick={(e) => handleAnchorClick(e, "plans")}
            className="text-gray-700 hover:text-black transition"
          >
            Plans
          </a>
          {/* FAQ - solo muestra si NO estoy en /faq */}
          {location.pathname !== "/faq" && (
            <Link
              to="/faq"
              className="text-gray-700 hover:text-black transition"
            >
              FAQ
            </Link>
          )}
          {/* Book Now con framer-motion */}
          <Link to="/book">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Book Now
            </motion.button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

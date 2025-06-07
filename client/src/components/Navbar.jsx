import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import readyLogo from '../assets/Ready1Logo.png';
import { Menu, X } from "lucide-react";

const Navbar = ({ small }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/main") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else navigate("/main");
    setMenuOpen(false);
  };

  const handleAnchorClick = (e, anchorId) => {
    e.preventDefault();
    if (location.pathname === "/main") {
      document.getElementById(anchorId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      localStorage.setItem("scrollToAnchor", anchorId);
      navigate("/main");
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b shadow-sm transition-all duration-300 backdrop-blur-md ${
        scrolled ? "bg-white/90 py-3 shadow-md" : `${small ? "py-2" : "py-6"} bg-white`
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-20">
        <a href="/main" onClick={handleLogoClick} className="flex items-center gap-2">
          <img src={readyLogo} alt="BikeDrop logo" className={`${small ? "h-10" : "h-20"}`} />
          <span className={`font-bold ${scrolled ? "text-lg" : small ? "text-xl" : "text-2xl"}`}>BikeDrop</span>
        </a>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/about" className="hover:text-black">About</Link>
          <a href="#services" onClick={(e) => handleAnchorClick(e, "services")} className="hover:text-black">Services</a>
          <a href="#plans" onClick={(e) => handleAnchorClick(e, "plans")} className="hover:text-black">Plans</a>
          {location.pathname !== "/faq" && <Link to="/faq" className="hover:text-black">FAQ</Link>}
          <Link to="/book">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Book Now
            </motion.button>
          </Link>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-md py-4 flex flex-col gap-3 px-6"
          >
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <a href="#services" onClick={(e) => handleAnchorClick(e, "services")}>Services</a>
            <a href="#plans" onClick={(e) => handleAnchorClick(e, "plans")}>Plans</a>
            {location.pathname !== "/faq" && <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>}
            <Link to="/book" onClick={() => setMenuOpen(false)}>Book Now</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

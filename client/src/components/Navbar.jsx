import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ small }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b shadow-sm transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? "bg-white/90 py-3 shadow-md"
          : `${small ? "py-2" : "py-6"} bg-white/100`
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-20">
        <Link to="/main" className="flex items-center gap-2 cursor-pointer">
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
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          <Link
            to="/about"
            className="text-gray-700 hover:text-black transition"
          >
            About
          </Link>
          <a
            href="#services"
            className="text-gray-700 hover:text-black transition"
          >
            Services
          </a>
          <a
            href="#plans"
            className="text-gray-700 hover:text-black transition"
          >
            Plans
          </a>
          <a
            href="/faq"
            className="text-gray-700 hover:text-black transition"
          >
            FAQ
          </a>
          <Link
            to="/book"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

import React from "react";
import { Mail, Phone, Instagram } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    if (location.pathname === "/main") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Deja que el Link funcione normal para cambiar página
    }
  };

  return (
    <footer className="bg-white text-gray-500 text-sm border-t border-blue-100 px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 text-center">

        <p className="text-gray-600 font-medium">© 2025 BikeDrop. Made in Denmark with 💚 and WD-40.</p>

        {/* Tel, Mail e Instagram en la misma fila */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-gray-700">
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-blue-600" />
            <span>+45 52 90 97 21</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-blue-600" />
            <span>bikedropdk.gmail.com</span>
          </div>
          <a
            href="https://instagram.com/BikeDropDK"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <Instagram size={18} />
            <span>Instagram</span>
          </a>
        </div>

        {/* Navegación secundaria */}
        <div className="flex gap-6 flex-wrap justify-center text-sm mt-3">
          <Link
            to="/main"
            onClick={handleHomeClick}
            className="hover:underline"
          >
            Home
          </Link>
          <Link to="/book" className="hover:underline">Book</Link>
          <Link to="/faq" className="hover:underline">FAQ</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </div>
      </div>
    </footer>
  );
}

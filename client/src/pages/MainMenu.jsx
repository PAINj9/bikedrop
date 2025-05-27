import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

const routes = [
  { path: "/main", label: "Home" },
  { path: "/book", label: "Book Appointment" },
  { path: "/status", label: "Bike Status" },
  { path: "/admin/reservations", label: "Admin - Reservations" },
];

export default function MainMenu() {
  return (
    <>
      <Helmet>
        <title>BikeDrop | Menu</title>
      </Helmet>

      <div className="min-h-screen bg-blue-50">
        <Navbar small />

        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-bold mb-6">BikeDrop Menu</h1>
          <div className="grid gap-4 w-full max-w-sm">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="bg-white text-blue-600 font-medium border border-blue-500 rounded-xl shadow px-6 py-4 text-center hover:bg-blue-100 transition"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

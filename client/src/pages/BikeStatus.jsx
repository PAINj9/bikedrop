import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet"; 

export default function BikeStatus() {
  const [latestReservation, setLatestReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/reservations")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setLatestReservation(data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar reservas:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>BikeDrop | Status</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen bg-blue-50"
      >
        <Navbar />

        <div className="p-6 flex flex-col items-center justify-start text-center">
          <h2 className="text-xl font-semibold mb-4">Bike Status</h2>

          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : latestReservation ? (
              <>
                <p className="text-gray-600 font-medium">Status:</p>
                <p className="text-xl font-semibold text-blue-700">Booked</p>
                <p className="text-sm text-gray-600">
                  Service: {latestReservation.service}
                </p>
                <p className="text-sm text-gray-600">
                  Appointment: {new Date(latestReservation.date).toLocaleDateString("es-AR")}
                </p>
              </>
            ) : (
              <p className="text-gray-500">No bookings yet.</p>
            )}
          </div>

          <Link to="/main" className="mt-6 inline-block text-blue-600 hover:underline text-sm">
            ← Back to BikeDropPage
          </Link>
        </div>
      </motion.div>
    </>
  );
}

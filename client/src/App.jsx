import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BookAppointment from "./pages/BookAppointment";
import BikeStatus from "./pages/BikeStatus";
import AdminReservations from "./pages/AdminReservations";
import MainMenu from "./pages/MainMenu";
import BikeDropPage from "./pages/BikeDropPage";
import Faq from "./pages/Faq";

function App() {
  return (
    <BrowserRouter>
      {/* 👇 Este contenedor es el que permite mostrar los toast en cualquier parte de la app */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="/main" element={<BikeDropPage />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/status" element={<BikeStatus />} />
        <Route path="/admin/reservations" element={<AdminReservations />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

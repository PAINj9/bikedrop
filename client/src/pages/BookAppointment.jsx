import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import CalendarSelector from "../components/CalendarSelector";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function BookAppointment() {
  const navigate = useNavigate();

  const [dateTime, setDateTime] = useState({ date: null, slot: null });
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState({});

  const [form, setForm] = useState({
    name: "",
    address: "",
    floor: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    note: "",
    service: {
      clean: false,
      brakeInspection: false,
      chainReplacement: false,
    },
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/reservations")
      .then((res) => res.json())
      .then((data) => {
        const grouped = {};
        data.forEach((resv) => {
          let dateKey = resv.date;
          if (dateKey && dateKey.includes("T")) {
            dateKey = dateKey.slice(0, 10);
          } else if (/\d{2}\/\d{1,2}\/\d{4}/.test(dateKey)) {
            const [day, month, year] = dateKey.split("/");
            dateKey = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
          }
          if (!grouped[dateKey]) grouped[dateKey] = [];
          grouped[dateKey].push(resv.time);
        });
        setBookedSlotsByDate(grouped);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        service: {
          ...prev.service,
          [name]: checked,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedServices = Object.entries(form.service)
      .filter(([_, checked]) => checked)
      .map(([service]) => service.charAt(0).toUpperCase() + service.slice(1))
      .join(", ");

    if (
      !form.name ||
      !form.address ||
      !form.city ||
      !form.phone ||
      !form.email ||
      !dateTime.date ||
      !dateTime.slot ||
      !selectedServices
    ) {
      toast.error("Please fill in all required fields and select a date/time.");
      return;
    }

    if (!/^\d+$/.test(form.phone)) {
      toast.error("Phone number must contain only digits.");
      return;
    }

    const payload = {
      ...form,
      date:
        typeof dateTime.date === "string"
          ? dateTime.date
          : dateTime.date?.toISOString().slice(0, 10),
      time: dateTime.slot,
      service: selectedServices,
    };

    try {
      const res = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Appointment confirmed! ✅");
        setTimeout(() => navigate("/status"), 1500);
      } else {
        toast.error("Failed to create the appointment.");
      }
    } catch {
      toast.error("Server connection error.");
    }
  };

  return (
    <>
      <Helmet>
        <title>BikeDrop | Appointment</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100"
      >
        <Navbar small />
        <div className="flex justify-center items-center min-h-[80vh] pt-12 mb-10">
          <motion.div
            initial={{ scale: 0.97, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="w-full max-w-3xl bg-white border border-blue-100 shadow-2xl rounded-3xl px-8 py-10"
          >
            <h2 className="text-3xl font-bold mb-7 text-blue-700 text-center">
              Book Appointment
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name*"
                  value={form.name}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-blue-400"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone*"
                  value={form.phone}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-blue-400"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={form.email}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-blue-400"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City*"
                  value={form.city}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:outline-blue-400"
                  required
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address*"
                value={form.address}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400"
                required
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  name="floor"
                  placeholder="Floor"
                  value={form.floor}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-1/2 focus:outline-blue-400"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={form.postalCode}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-1/2 focus:outline-blue-400"
                />
              </div>
              <CalendarSelector
                value={dateTime}
                onChange={setDateTime}
                bookedSlotsByDate={bookedSlotsByDate}
              />
              <fieldset className="mb-2">
                <legend className="font-semibold mb-2 text-gray-700">
                  Service(s)*
                </legend>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="clean"
                      checked={form.service.clean}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    Clean
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="brakeInspection"
                      checked={form.service.brakeInspection}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    Brake Inspection
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="chainReplacement"
                      checked={form.service.chainReplacement}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    Chain Replacement
                  </label>
                </div>
              </fieldset>
              <textarea
                name="note"
                placeholder="Additional notes (optional)"
                value={form.note}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400"
                rows={3}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl text-lg shadow-lg hover:bg-blue-700 transition"
                disabled={!dateTime.date || !dateTime.slot}
              >
                Confirm Appointment
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

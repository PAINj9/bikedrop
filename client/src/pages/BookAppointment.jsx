import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import CalendarSelector from "../components/CalendarSelector";
import PlanSelector from "../components/PlanSelector";
import StepProgressBar from "../components/StepProgressBar";
import OrderSummary from "../components/OrderSummary";

export default function BookAppointment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Campos y errores
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    floor: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});
  const [dateTime, setDateTime] = useState({ date: null, slot: null });
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState({});
  const [selectedPlan, setSelectedPlan] = useState("");
  const [planError, setPlanError] = useState("");
  const [step, setStep] = useState(1);

  // Refs para enfocar campos con error
  const inputRefs = {
    name: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    address: useRef(null),
    floor: useRef(null),
    city: useRef(null),
    postalCode: useRef(null),
  };

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

  // Validación campo a campo
  function validateField(name, value) {
    switch (name) {
      case "name":
        if (!value.trim() || value.length < 2) return "Please enter your name.";
        break;
      case "phone":
        if (!/^\d{7,}$/.test(value)) return "Valid phone (min 7 digits, numbers only).";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email.";
        break;
      case "address":
        if (!value.trim() || value.length < 2) return "Enter your address.";
        break;
      case "floor":
        if (!value.trim()) return "Enter the floor.";
        break;
      case "city":
        if (!value.trim() || value.length < 2) return "Enter your city.";
        break;
      case "postalCode":
        if (!value.trim()) return "Enter the postal code.";
        break;
      default:
        return "";
    }
    return "";
  }

  // Control de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Solo números en phone
    let newValue = value;
    if (name === "phone") newValue = value.replace(/\D/g, "");

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, newValue),
    }));
  };

  // Si todos los campos están OK
  const isPersonalInfoValid = () => {
    return ["name", "phone", "email", "address", "floor", "city", "postalCode"]
      .every((f) => !validateField(f, form[f]));
  };

  const isFormValid = () => {
    return (
      isPersonalInfoValid() &&
      dateTime.date &&
      dateTime.slot &&
      selectedPlan
    );
  };

  // Control de pasos visual
  useEffect(() => {
    if (!isPersonalInfoValid()) setStep(1);
    else if (!dateTime.date || !dateTime.slot) setStep(2);
    else if (!selectedPlan) setStep(3);
    else setStep(4);
  }, [form, dateTime, selectedPlan]);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos personales
    const newErrors = {};
    ["name", "phone", "email", "address", "floor", "city", "postalCode"].forEach((field) => {
      const err = validateField(field, form[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);

    if (!isPersonalInfoValid()) {
      toast.error("Please complete all required fields.");
      const firstError = Object.keys(newErrors)[0];
      if (inputRefs[firstError] && inputRefs[firstError].current) {
        inputRefs[firstError].current.focus();
      }
      return;
    }

    if (!dateTime.date || !dateTime.slot) {
      toast.error("Please select a date and time.");
      return;
    }
    if (!selectedPlan) {
      setPlanError("Please choose a plan.");
      toast.error("Please choose a plan.");
      return;
    }

    setPlanError("");

    // Payload
    const payload = {
      ...form,
      date:
        typeof dateTime.date === "string"
          ? dateTime.date
          : dateTime.date?.toISOString().slice(0, 10),
      time: dateTime.slot,
      service: selectedPlan, // Guarda el plan (basic/complete/pro)
    };

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>BikeDrop | Appointment</title>
      </Helmet>
      <Navbar small />

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-1">
        <div className="w-full max-w-5xl">
          {/* StepProgressBar con padding top */}
          <div className="pt-5 sm:pt-8">
            <StepProgressBar currentStep={step} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full bg-white border border-blue-100 shadow-2xl rounded-2xl sm:rounded-3xl px-3 sm:px-10 py-7 sm:py-12 mt-6 mb-12 transition-all duration-300"
            autoComplete="off"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-7 text-blue-700 text-center">
              Book Appointment
            </h2>
            {/* MOBILE: stack, DESKTOP: row */}
            <div className="flex flex-col lg:flex-row gap-7 sm:gap-8">
              {/* FORMULARIO */}
              <div className="flex-1 transition-all duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <input
                      ref={inputRefs.name}
                      type="text"
                      name="name"
                      placeholder="Full Name*"
                      value={form.name}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
                      required
                      maxLength={40}
                    />
                    {errors.name && (
                      <div className="text-red-600 text-sm mt-1">{errors.name}</div>
                    )}
                  </div>
                  <div>
                    <input
                      ref={inputRefs.phone}
                      type="tel"
                      name="phone"
                      placeholder="Phone*"
                      value={form.phone}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
                      required
                      maxLength={15}
                    />
                    {errors.phone && (
                      <div className="text-red-600 text-sm mt-1">{errors.phone}</div>
                    )}
                  </div>
                  <div>
                    <input
                      ref={inputRefs.email}
                      type="email"
                      name="email"
                      placeholder="Email*"
                      value={form.email}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
                      required
                      maxLength={60}
                    />
                    {errors.email && (
                      <div className="text-red-600 text-sm mt-1">{errors.email}</div>
                    )}
                  </div>
                  <div>
                    <input
                      ref={inputRefs.city}
                      type="text"
                      name="city"
                      placeholder="City*"
                      value={form.city}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
                      required
                      maxLength={30}
                    />
                    {errors.city && (
                      <div className="text-red-600 text-sm mt-1">{errors.city}</div>
                    )}
                  </div>
                </div>
                <input
                  ref={inputRefs.address}
                  type="text"
                  name="address"
                  placeholder="Address*"
                  value={form.address}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 mt-4 text-base"
                  required
                  maxLength={50}
                />
                {errors.address && (
                  <div className="text-red-600 text-sm mt-1">{errors.address}</div>
                )}
                <div className="flex gap-3 mt-4">
                  <div className="w-1/2">
                    <input
                      ref={inputRefs.floor}
                      type="text"
                      name="floor"
                      placeholder="Floor*"
                      value={form.floor}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
                      required
                      maxLength={10}
                    />
                    {errors.floor && (
                      <div className="text-red-600 text-sm mt-1">{errors.floor}</div>
                    )}
                  </div>
                  <div className="w-1/2">
                    <input
                      ref={inputRefs.postalCode}
                      type="text"
                      name="postalCode"
                      placeholder="Postal Code*"
                      value={form.postalCode}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
                      required
                      maxLength={12}
                    />
                    {errors.postalCode && (
                      <div className="text-red-600 text-sm mt-1">{errors.postalCode}</div>
                    )}
                  </div>
                </div>
                {/* CALENDARIO y PLAN */}
                <div className="mt-7">
                  {isPersonalInfoValid() && (
                    <CalendarSelector
                      value={dateTime}
                      onChange={setDateTime}
                      bookedSlotsByDate={bookedSlotsByDate}
                      errors={errors}
                    />
                  )}
                  {isPersonalInfoValid() && dateTime.date && dateTime.slot && (
                    <PlanSelector
                      value={selectedPlan}
                      onChange={setSelectedPlan}
                      error={planError}
                    />
                  )}
                </div>
                <button
                  type="submit"
                  className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-xl text-lg shadow-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-6 ${
                    (!isFormValid() || loading) && "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid() || loading}
                >
                  {loading ? "Confirming..." : "Confirm Appointment"}
                </button>
              </div>

              {/* ORDER SUMMARY */}
              <div
                className={`relative w-full max-w-xs min-h-[320px] transition-all duration-500
                  ${isPersonalInfoValid() ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"}
                  mx-auto lg:mx-0
                `}
                style={{ willChange: "opacity, transform" }}
              >
                {isPersonalInfoValid() && (
                  <OrderSummary
                    form={form}
                    dateTime={dateTime}
                    plan={selectedPlan}
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

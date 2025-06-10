import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useBookAppointment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    floor: "",
    city: "",
    postalCode: "",
  });

  const [note, setNote] = useState(""); // ← antes lo manejabas así

  const [errors, setErrors] = useState({});
  const [dateTime, setDateTime] = useState({ date: null, slot: null });
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState({});
  const [selectedPlan, setSelectedPlan] = useState("");
  const [planError, setPlanError] = useState("");
  const [step, setStep] = useState(1);

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

  const validateField = (name, value) => {
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "phone" ? value.replace(/\D/g, "") : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
  };

  const isPersonalInfoValid = () => {
    return ["name", "phone", "email", "address", "floor", "city", "postalCode"]
      .every((f) => !validateField(f, form[f]));
  };

  const isFormValid = () => {
    return isPersonalInfoValid() && dateTime.date && dateTime.slot && selectedPlan;
  };

  useEffect(() => {
    if (!isPersonalInfoValid()) setStep(1);
    else if (!dateTime.date || !dateTime.slot) setStep(2);
    else if (!selectedPlan) setStep(3);
    else setStep(4);
  }, [form, dateTime, selectedPlan]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const payload = {
      ...form,
      date: typeof dateTime.date === "string"
        ? dateTime.date
        : dateTime.date?.toISOString().slice(0, 10),
      time: dateTime.slot,
      service: selectedPlan,
      note: note.trim(), // ← notita por separado
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

  return {
    loading,
    form,
    errors,
    dateTime,
    bookedSlotsByDate,
    selectedPlan,
    planError,
    step,
    inputRefs,
    handleChange,
    isPersonalInfoValid,
    isFormValid,
    handleSubmit,
    setDateTime,
    setSelectedPlan,
    note,
    setNote,
  };
}

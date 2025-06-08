import React, { useState, useEffect } from "react";

function generateTimeSlots() {
  const slots = [];
  for (let h = 9; h <= 20; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
  }
  return slots;
}

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarSelector({
  value,
  onChange,
  bookedSlotsByDate = {},
  errors = {},
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  function getDateString(dateObj) {
    if (!dateObj) return null;
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (value && value.date) {
      if (typeof value.date === "string") {
        setSelectedDate(new Date(value.date));
      } else {
        setSelectedDate(value.date);
      }
    }
    if (value && value.slot) setSelectedSlot(value.slot);
  }, [value?.date, value?.slot]);

  const days = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  const selectedDateStr = selectedDate ? getDateString(selectedDate) : null;
  const firstDayOfWeek = (days[0].getDay() + 6) % 7;

  const allSlots = generateTimeSlots();
  const bookedSlots = bookedSlotsByDate[selectedDateStr] || [];

  function handleDayClick(day) {
    const dateStr = getDateString(day);
    setSelectedDate(day);
    setSelectedSlot(null);
    if (onChange) onChange({ date: dateStr, slot: null });
  }

  function handleSlotClick(slot) {
    if (onChange) onChange({ date: selectedDateStr, slot });
    setSelectedSlot(slot);
  }

  function prevMonth() {
    const lastDayPrev = new Date(year, month - 1 + 1, 0);
    lastDayPrev.setHours(0, 0, 0, 0);
    if (lastDayPrev < today) return;
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
    setSelectedDate(null);
    setSelectedSlot(null);
    if (onChange) onChange({ date: null, slot: null });
  }

  function nextMonth() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
    setSelectedDate(null);
    setSelectedSlot(null);
    if (onChange) onChange({ date: null, slot: null });
  }

  function isPastDay(day) {
    const d = new Date(day);
    d.setHours(0, 0, 0, 0);
    return d < today;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto mb-6">
      <div className="font-semibold mb-3 text-gray-700 text-center">
        Select a day to see available times
      </div>
      <div className="flex justify-between items-center mb-2">
        <button
          type="button"
          onClick={prevMonth}
          className="px-2 py-1 rounded hover:bg-blue-100 text-xl"
          disabled={
            new Date(year, month, 1) < today &&
            new Date(year, month + 1, 0) < today
          }
        >
          &lt;
        </button>
        <span className="font-bold text-lg">
          {new Date(year, month).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="px-2 py-1 rounded hover:bg-blue-100 text-xl"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-gray-500 mb-1">
        {weekdays.map((w) => (
          <div key={w} className="font-medium">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {Array(firstDayOfWeek)
          .fill(0)
          .map((_, i) => (
            <div key={"sp" + i}></div>
          ))}
        {days.map((day) => {
          const dStr = getDateString(day);
          const isSelected = selectedDateStr === dStr;
          const isToday = dStr === getDateString(today);
          const past = isPastDay(day);
          return (
            <button
              key={dStr}
              type="button"
              onClick={() => handleDayClick(day)}
              disabled={past}
              className={`rounded-full w-10 h-10 flex items-center justify-center mb-2
                ${
                  past
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : isSelected
                    ? "bg-blue-500 text-white"
                    : isToday
                    ? "border border-blue-400"
                    : "hover:bg-blue-100"
                }
              `}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        <div className="font-semibold mb-2 text-gray-700">
          {selectedDate
            ? `Available times for ${selectedDate.toLocaleDateString("en-US")}`
            : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedDate &&
            allSlots.map((slot) => {
              const booked = bookedSlots.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={booked}
                  onClick={() => !booked && handleSlotClick(slot)}
                  className={`
                    border px-4 py-2 rounded font-semibold transition
                    ${
                      booked
                        ? "bg-red-200 border-red-400 text-red-700 cursor-not-allowed"
                        : selectedSlot === slot
                        ? "bg-green-700 text-white border-green-800"
                        : "bg-green-100 border-green-400 text-green-700 hover:bg-green-200"
                    }
                  `}
                >
                  {slot}
                </button>
              );
            })}
        </div>
        {selectedDate && allSlots.length === 0 && (
          <span className="text-gray-400 italic">
            No times available for this day
          </span>
        )}
        {errors.date && (
          <div className="text-red-600 text-sm mt-1">{errors.date}</div>
        )}
        {errors.slot && (
          <div className="text-red-600 text-sm mt-1">{errors.slot}</div>
        )}
      </div>
    </div>
  );
}

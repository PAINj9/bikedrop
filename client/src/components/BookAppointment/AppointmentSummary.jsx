import React from "react";
import OrderSummary from "./OrderSummary";

export default function AppointmentSummary({
  isPersonalInfoValid,
  form,
  dateTime,
  selectedPlan,
  note,
}) {
  if (!isPersonalInfoValid) return null;

  return (
    <div
      className={`relative w-full max-w-xs min-h-[320px] transition-all duration-500
        opacity-100 translate-x-0 mx-auto lg:mx-0`}
      style={{ willChange: "opacity, transform" }}
    >
      <OrderSummary
        form={form}
        dateTime={dateTime}
        plan={selectedPlan}
        note={note}
      />
    </div>
  );
}

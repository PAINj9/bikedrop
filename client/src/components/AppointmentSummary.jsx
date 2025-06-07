import React from "react";
import OrderSummary from "../components/OrderSummary";

export default function AppointmentSummary({ form, dateTime, plan, visible }) {
  return (
    <div
      className={`relative w-full max-w-xs min-h-[320px] transition-all duration-500
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"}
        mx-auto lg:mx-0
      `}
      style={{ willChange: "opacity, transform" }}
    >
      {visible && <OrderSummary form={form} dateTime={dateTime} plan={plan} />}
    </div>
  );
}

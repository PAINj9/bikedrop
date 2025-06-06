// PlanSelector.jsx

//Aca pongo el precio en el booking appointment
import React from "react";

const plans = [
  {
    key: "basic",
    title: "Basic",
    price: "179 DKK/mo",
    subtitle: "Perfect for casual or weekend riders",
    features: [
      "1 home visit/month",
      "Exterior cleaning (frame, wheels)",
      "Brake & gear adjustment",
      "Safety check & tire inflation",
    ],
  },
  {
    key: "complete",
    title: "Complete",
    price: "299 DKK/mo",
    subtitle: "Best for commuters & regular cyclists",
    features: [
      "2 home visits/month",
      "All Basic services",
      "Chain lubrication",
      "Wheel truing",
      "Minor repairs (cables, bolts, seat, etc.)",
    ],
  },
  {
    key: "pro",
    title: "Pro",
    price: "449 DKK/mo",
    subtitle: "Ultimate care & priority access",
    features: [
      "2 home visits/month",
      "All Complete services",
      "Drivetrain deep cleaning",
      "Brake pads replacement (labour)",
      "1 emergency on-demand visit/month",
      "Priority scheduling",
    ],
  },
];

export default function PlanSelector({ value, onChange, error }) {
  return (
    <fieldset className="mb-6">
      <legend className="font-semibold mb-2 text-gray-700">
        Choose your plan<span className="text-red-500">*</span>
      </legend>
      <div className="flex flex-col md:flex-row gap-6">
        {plans.map((plan) => (
          <label
            key={plan.key}
            className={`flex-1 border rounded-2xl p-6 shadow-md cursor-pointer transition duration-200
              ${value === plan.key
                ? "border-blue-500 ring-2 ring-blue-400 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-300"}
            `}
            tabIndex={0}
            onKeyPress={e => (e.key === " " || e.key === "Enter") && onChange(plan.key)}
          >
            <input
              type="radio"
              name="plan"
              value={plan.key}
              checked={value === plan.key}
              onChange={() => onChange(plan.key)}
              className="hidden"
              aria-checked={value === plan.key}
              aria-label={plan.title}
            />
            <div className="text-xl font-bold mb-2 text-blue-700">{plan.title}</div>
            <div className="text-3xl font-extrabold mb-2">{plan.price}</div>
            <div className="mb-4 text-gray-500 text-sm">{plan.subtitle}</div>
            <ul className="mb-4 text-gray-700 text-sm">
              {plan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
          </label>
        ))}
      </div>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </fieldset>
  );
}

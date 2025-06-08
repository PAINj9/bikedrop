import { CheckCircle } from "lucide-react";

const plans = [
  {
    title: "Basic",
    value: "basic",
    price: "179 DKK/mo",
    features: [
      "1 home visit/month",
      "Exterior cleaning",
      "Brake & gear adjustment",
      "Safety check & tire inflation"
    ]
  },
  {
    title: "Complete",
    value: "complete",
    price: "299 DKK/mo",
    features: [
      "2 home visits/month",
      "All Basic services",
      "Chain lubrication",
      "Wheel truing",
      "Minor repairs (cables, seat, etc.)"
    ]
  },
  {
    title: "Pro",
    value: "pro",
    price: "449 DKK/mo",
    features: [
      "2 home visits/month",
      "All Complete services",
      "Drivetrain deep cleaning",
      "Brake pads replacement (labour)",
      "1 emergency visit/month",
      "Priority scheduling"
    ]
  }
];

export default function PlanSelect({ selected, onChange, error }) {
  return (
    <fieldset className="mb-2">
      <legend className="font-semibold mb-2 text-gray-700">
        Choose your plan*
      </legend>
      <div className="flex flex-col sm:flex-row gap-4">
        {plans.map(plan => (
          <button
            key={plan.value}
            type="button"
            onClick={() => onChange(plan.value)}
            className={`
              flex-1 border rounded-2xl p-4 shadow transition text-left
              ${selected === plan.value
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-400"
                : "border-gray-200 bg-white hover:border-blue-300"}
            `}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-lg font-bold ${selected === plan.value ? "text-blue-600" : "text-gray-800"}`}>
                {plan.title}
              </span>
              {selected === plan.value && <CheckCircle className="w-5 h-5 text-blue-500" />}
            </div>
            <div className="font-extrabold text-2xl mb-2">{plan.price}</div>
            <ul className="text-sm text-gray-600 space-y-1 pl-2">
              {plan.features.map(f => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </button>
        ))}
      </div>
      {error && (
        <div className="text-red-600 text-sm mt-1">{error}</div>
      )}
    </fieldset>
  );
}

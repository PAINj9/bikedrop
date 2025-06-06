import { User, Calendar, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  {
    key: 1,
    label: "Your Info",
    icon: <User className="w-5 h-5" />,
  },
  {
    key: 2,
    label: "Select Date",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    key: 3,
    label: "Choose Plan",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    key: 4,
    label: "Confirm",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

export default function StepProgressBar({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 w-full mb-8 select-none">
      {steps.map((step, idx) => (
        <div className="flex items-center" key={step.key}>
          <div
            className={`
              flex flex-col items-center transition
              ${currentStep === idx + 1
                ? "text-blue-700 font-semibold"
                : currentStep > idx + 1
                ? "text-green-500"
                : "text-gray-400"}
            `}
          >
            <div
              className={`
                rounded-full w-9 h-9 flex items-center justify-center mb-1
                ${currentStep === idx + 1
                  ? "bg-blue-100 border-2 border-blue-500 shadow"
                  : currentStep > idx + 1
                  ? "bg-green-100 border border-green-400"
                  : "bg-gray-100 border"}
              `}
            >
              {step.icon}
            </div>
            <div className="text-xs text-center">
              {step.label}
            </div>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`h-1 w-10 mx-2 rounded-full ${
                currentStep > idx + 1
                  ? "bg-green-400"
                  : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

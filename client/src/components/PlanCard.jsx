import React from "react";
import { Link } from "react-router-dom";

export default function PlanCard({ plan }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform transform w-full max-w-xs mx-auto">
      <div className={`h-2 ${plan.color}`}></div>
      <div className="p-6 flex flex-col justify-between h-[500px]">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{plan.title}</h3>
          <p className="text-gray-600 text-sm mb-1">{plan.subtitle}</p>
          <p className="text-sm text-gray-500 mb-4">{plan.visits}</p>
          <p className="text-2xl font-bold text-gray-800 mb-4">{plan.price}</p>
          <ul className="text-sm text-gray-600 mb-6 space-y-2">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 mr-2 text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <Link to="/book">
          <button className="w-full bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 focus:outline-none">
            Select Plan
          </button>
        </Link>
      </div>
    </div>
  );
}

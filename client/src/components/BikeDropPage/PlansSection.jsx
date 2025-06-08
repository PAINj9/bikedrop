import React, { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const plans = [
  {
    title: "Basic",
    price: "179 DKK/month",
    subtitle: "Perfect for casual or weekend riders",
    features: [
      "1 home visit/month",
      "Exterior cleaning (frame, wheels)",
      "Brake & gear adjustment",
      "Safety check & tire inflation",
    ],
  },
  {
    title: "Pro",
    price: "449 DKK/month",
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
  {
    title: "Complete",
    price: "299 DKK/month",
    subtitle: "Best for commuters & regular cyclists",
    features: [
      "2 home visits/month",
      "All Basic services",
      "Chain lubrication",
      "Wheel truing",
      "Minor repairs (cables, bolts, seat, etc.)",
    ],
  },
];

export default function PlansSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1, spacing: 16 },
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  return (
    <section
      id="plans"
      className="py-12 px-2 sm:px-6 md:px-20 bg-gray-50 scroll-mt-24"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
        Monthly Plans
      </h2>

      {/* Mobile slider */}
      <div className="block md:hidden">
        <div ref={sliderRef} className="keen-slider overflow-visible">
          {plans.map((plan) => (
            <motion.div
              key={plan.title}
              className="keen-slider__slide flex justify-center overflow-visible pt-8"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative overflow-visible">
                <PlanCard plan={plan} />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {plans.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === idx
                  ? "bg-blue-500 scale-110 shadow"
                  : "bg-blue-200"
              }`}
              aria-label={`Go to plan ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop version */}
      <div className="w-full flex flex-col items-center gap-10 md:flex-row md:justify-center md:items-stretch md:gap-6 hidden md:flex">
        {plans.map((plan) => (
          <motion.div
            key={plan.title}
            whileHover={{
              scale: plan.title === "Pro" ? 1.05 : 1.03,
              boxShadow:
                plan.title === "Pro"
                  ? "0 0 18px 0 rgba(253, 211, 71, 0.7)" // amarillo intenso para Pro
                  : "0 0 18px 0 rgba(59,130,246,0.20)",
            }}
            transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
            className={`
              relative bg-white border rounded-2xl shadow-md
              flex flex-col items-center
              w-full
              max-w-[390px]
              md:min-w-[340px] md:max-w-[370px]
              md:border-2
              px-5 sm:px-8 pt-10 pb-7
              transition-shadow
              ${
                plan.title === "Pro"
                  ? "border-yellow-400 shadow-lg md:z-10"
                  : plan.title === "Complete"
                  ? "border-blue-400 shadow-lg"
                  : "border-gray-200"
              }
            `}
            style={{ willChange: "transform" }}
          >
            <Badge plan={plan} />
            <CardContent plan={plan} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PlanCard({ plan }) {
  return (
    <div
      className={`
        relative bg-white border rounded-2xl shadow-md
        flex flex-col items-center
        w-full max-w-[390px] md:min-w-[340px] md:max-w-[370px]
        border
        px-5 sm:px-8 pt-10 pb-7
        ${
          plan.title === "Pro"
            ? "border-yellow-400 shadow-lg"
            : plan.title === "Complete"
            ? "border-blue-400 shadow-lg"
            : "border-gray-200"
        }
      `}
    >
      <Badge plan={plan} />
      <CardContent plan={plan} />
    </div>
  );
}

function Badge({ plan }) {
  if (plan.title === "Pro") {
    return (
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 border border-yellow-600 z-10">
        <Star className="w-4 h-4 text-yellow-900" /> Popular
      </div>
    );
  }
  if (plan.title === "Complete") {
    return (
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 border border-blue-700 z-10">
        <Star className="w-4 h-4 text-yellow-300" /> Best Value
      </div>
    );
  }
  return null;
}

function CardContent({ plan }) {
  return (
    <>
      <div
        className={`mb-2 text-lg sm:text-xl font-bold ${
          plan.title === "Pro"
            ? "text-yellow-500"
            : plan.title === "Complete"
            ? "text-blue-500"
            : "text-blue-600"
        }`}
      >
        {plan.title}
      </div>
      <div
        className={`text-3xl sm:text-4xl font-extrabold mb-2 ${
          plan.title === "Pro"
            ? "text-yellow-500"
            : plan.title === "Complete"
            ? "text-blue-500"
            : "text-gray-900"
        }`}
      >
        {plan.price}
      </div>
      <div className="mb-4 text-gray-500 text-sm sm:text-base text-center">
        {plan.subtitle}
      </div>
      <ul className="mb-6 text-gray-700 w-full space-y-1 text-sm sm:text-base">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                plan.title === "Pro" ? "bg-yellow-400" : "bg-blue-500"
              }`}
            ></span>
            {feature}
          </li>
        ))}
      </ul>
      <Link to="/book" className="w-full">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-2 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg transition shadow-md ${
            plan.title === "Pro"
              ? "bg-yellow-400 text-white hover:bg-yellow-500"
              : plan.title === "Complete"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Book Now
        </motion.button>
      </Link>
    </>
  );
}

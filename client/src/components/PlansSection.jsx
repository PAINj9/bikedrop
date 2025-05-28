import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function PlansSection({ plans }) {
  // Opcionales: props de animación si las querés de vuelta en las cards

  return (
    <section
      id="plans"
      className="py-20 px-6 md:px-20 bg-gray-50 scroll-mt-24"
    >
      <h2 className="text-3xl font-semibold text-center mb-12">Monthly Plans</h2>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">

        {/* Basic */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px 0 rgba(59,130,246,0.35)" }}
          transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
          className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-md p-8 flex flex-col items-center min-w-[270px] max-w-[320px] transition-shadow"
          style={{ willChange: "transform" }}
        >
          <div className="mb-2 text-xl font-bold text-blue-600">{plans[0].title}</div>
          <div className="text-4xl font-extrabold mb-2 text-gray-900">{plans[0].price}</div>
          <div className="mb-4 text-gray-500 text-sm">{plans[0].subtitle}</div>
          <ul className="mb-6 text-gray-700 w-full space-y-1">
            {plans[0].features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {feature}
              </li>
            ))}
          </ul>
          <button className="py-2 px-8 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition">Choose</button>
        </motion.div>

        {/* Pro */}
        <motion.div
          whileHover={{ scale: 1.08, boxShadow: "0 0 40px 4px rgba(253,224,71,0.65)" }}
          transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
          className="relative flex-1 bg-white border-2 border-yellow-400 rounded-2xl shadow-lg p-10 flex flex-col items-center min-w-[320px] max-w-[370px] z-10 scale-105 transition-shadow"
          style={{ willChange: "transform" }}
        >
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
            <Star className="w-4 h-4" /> Popular
          </div>
          <div className="mb-2 text-xl font-extrabold text-yellow-500">{plans[1].title}</div>
          <div className="text-4xl font-bold mb-2 text-yellow-500">{plans[1].price}</div>
          <div className="mb-4 text-gray-500 text-sm">{plans[1].subtitle}</div>
          <ul className="mb-6 text-gray-700 w-full space-y-1">
            {plans[1].features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                {feature}
              </li>
            ))}
          </ul>
          <button className="py-2 px-8 rounded-xl font-bold bg-yellow-400 text-white hover:bg-yellow-500 shadow-md transition">Choose</button>
        </motion.div>

        {/* Complete */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px 4px rgba(59,130,246,0.30)" }}
          transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
          className="relative flex-1 bg-white border-2 border-blue-400 rounded-2xl shadow-lg p-10 flex flex-col items-center min-w-[320px] max-w-[370px] transition-shadow"
          style={{ willChange: "transform" }}
        >
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
            <Star className="w-4 h-4 text-yellow-300" /> Best Value
          </div>
          <div className="mb-2 text-xl font-extrabold text-blue-500">{plans[2].title}</div>
          <div className="text-4xl font-bold mb-2 text-blue-500">{plans[2].price}</div>
          <div className="mb-4 text-gray-500 text-sm">{plans[2].subtitle}</div>
          <ul className="mb-6 text-gray-700 w-full space-y-1">
            {plans[2].features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {feature}
              </li>
            ))}
          </ul>
          <button className="py-2 px-8 rounded-xl font-bold bg-blue-500 text-white hover:bg-blue-600 shadow-md transition">Choose</button>
        </motion.div>
      </div>
    </section>
  );
}

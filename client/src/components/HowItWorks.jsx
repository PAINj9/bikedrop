import React from "react";
import { FaCalendarCheck, FaHome, FaBiking } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaCalendarCheck className="text-blue-500 text-4xl mb-2" />,
    title: "Book an Appointment",
    desc: "Choose your preferred date and time. Booking is quick and easy.",
  },
  {
    icon: <FaHome className="text-yellow-500 text-4xl mb-2" />,
    title: "We Come to You",
    desc: "Our mechanic arrives at your location and takes care of your bike.",
  },
  {
    icon: <FaBiking className="text-green-500 text-4xl mb-2" />,
    title: "Enjoy Your Ride",
    desc: "Hop on your bike and enjoy! Smooth, safe and ready to roll.",
  },
];

export default function HowItWorks() {
  return (
    <motion.section
      className="bg-gray-100 py-16"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false }} // <-- Para animar cada vez que entra en pantalla
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-start gap-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex-1 flex flex-col items-center text-center transition-all"
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {step.icon}
              <div className="text-xl font-semibold mb-2 mt-2">{step.title}</div>
              <div className="text-gray-500">{step.desc}</div>
              <div className="hidden md:block h-10 border-l-2 border-gray-200 mx-auto my-4" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

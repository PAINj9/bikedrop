import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.13, duration: 0.6, ease: "easeOut" }
  })
};

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | BikeDrop</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-tl from-blue-50 via-white to-blue-100 text-gray-900">
        <Navbar />
        <div className="max-w-3xl mx-auto pt-20 pb-10 px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-700 drop-shadow-sm"
          >
            About BikeDrop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-xl text-gray-700 mb-10 max-w-2xl"
          >
            <span className="font-bold">BikeDrop</span> is more than just a service — it’s a new way to keep your bike in top shape, without ever leaving your home. 
            Born in Aarhus and powered by passion, we believe that every cyclist deserves convenience, quality, and a touch of personal care.
          </motion.p>

          {/* MISSION CARDS */}
          <div className="grid gap-5 md:grid-cols-2 mb-10">
            {[
              {
                icon: "🚲",
                title: "Mobile & Personal",
                desc: "We come to you, wherever you are in Aarhus. Repairs, tune-ups, and regular maintenance – all at your doorstep."
              },
              {
                icon: "🛠️",
                title: "Flexible Subscriptions",
                desc: "Choose the plan that fits your needs: occasional, commuter, or pro. No hidden fees, just honest care for your ride."
              },
              {
                icon: "⚡",
                title: "Fast & Friendly",
                desc: "We value your time. Quick response, professional service, and genuine advice from bike lovers."
              },
              {
                icon: "🌱",
                title: "Sustainable Mobility",
                desc: "We support green, active transport and work to make cycling even easier for everyone in the city."
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-2xl shadow bg-white p-6 flex flex-col gap-2 border border-blue-100"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <div className="text-3xl mb-1">{item.icon}</div>
                <div className="font-bold text-lg text-blue-700">{item.title}</div>
                <div className="text-gray-600">{item.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* TEAM VISION */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="bg-blue-50 rounded-2xl p-6 mb-10 shadow-sm"
          >
            <h2 className="font-bold text-2xl text-blue-700 mb-2">Our Vision</h2>
            <p className="text-gray-700">
              We are cyclists, mechanics, and city-lovers — united by the idea that bike care should be simple, transparent, and always accessible. 
              Let us handle the hassle, so you can focus on enjoying your ride.
            </p>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white border border-blue-100 rounded-xl p-6 shadow"
          >
            <div>
              <div className="font-semibold text-blue-700 text-lg">Contact us:</div>
              <div className="text-gray-700 mt-2">
                <span className="block mb-1">
                  <strong>Email:</strong> info@bikedrop.dk
                </span>
                <span className="block mb-1">
                  <strong>Phone:</strong> +45 12 34 56 78
                </span>
                <span className="block">
                  <strong>Instagram:</strong> <a className="text-blue-600 underline" href="https://instagram.com/BikeDropDK" target="_blank" rel="noopener noreferrer">@BikeDropDK</a>
                </span>
              </div>
            </div>
            <img
              src="/Ready1Logo.png"
              alt="BikeDrop logo"
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-contain drop-shadow"
              draggable="false"
            />
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}

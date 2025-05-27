import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlanCard from "../components/PlanCard";
import ServiceFeatures from "../components/ServiceFeatures";

export default function BikeDropPage() {
  const plans = [
    {
      title: "Basic",
      subtitle: "Perfect for occasional riders",
      visits: "1 visit/month",
      price: "250 DKK/month",
      color: "bg-blue-200",
      features: ["Cleaning", "Brake & gear adjustment"],
    },
    {
      title: "Complete",
      subtitle: "Great for regular commuters",
      visits: "2 visits/month",
      price: "400 DKK/month",
      color: "bg-green-200",
      features: ["All from Basic", "Chain lubrication", "Wheel truing"],
    },
    {
      title: "Pro",
      subtitle: "For high mileage cyclists",
      visits: "4 visits/month",
      price: "650 DKK/month",
      color: "bg-yellow-200",
      features: ["All from Complete", "Minor replacements", "Full technical check"],
    },
  ];

  return (
    <>
      <Helmet>
        <title>BikeDrop | Home</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen bg-white text-gray-900"
      >
        <Navbar />

        {/* Hero section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 gap-10"
        >
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              We Take Care of Your Bike, Wherever You Are
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              BikeDrop is a mobile bike maintenance service based in Aarhus. We come to you — offering flexible subscription plans tailored to your riding style. From quick tune-ups and regular cleaning to full technical repairs, your bike stays in top shape, so you can just enjoy the ride.
            </p>
            <Link to="/book">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Book Now
              </button>
            </Link>
          </div>
          <img
            src="/bike-hero.jpg"
            alt="Woman riding a bike"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </motion.section>

        {/* Services */}
        <ServiceFeatures />

        {/* Plans */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }}
          className="py-20 px-6 md:px-20 bg-gray-50"
        >
          <h2 className="text-3xl font-semibold text-center mb-12">Monthly Plans</h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4">
            {plans.map((plan, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }}>
                <PlanCard plan={plan} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          id="about"
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ amount: 0.1 }}
          className="text-center py-20 px-6 md:px-20"
        >
          <h2 className="text-3xl font-semibold mb-4">Ready to ride?</h2>
          <p className="mb-6 text-gray-600">
            Book online or message us on WhatsApp in under 2 minutes.
          </p>
          <Link to="/book">
            <button className="bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800">
              Book Now
            </button>
          </Link>
        </motion.section>

        <Footer />
      </motion.div>
    </>
  );
}

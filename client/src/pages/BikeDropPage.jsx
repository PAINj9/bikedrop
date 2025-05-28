import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BikeDropHero from "../components/BikeDropHero";
import ServiceFeatures from "../components/ServiceFeatures";
import PlansSection from "../components/PlansSection";
import CTASection from "../components/CTASection";

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
      title: "Pro", // <-- Este es el plan PRO, va en el centro
      subtitle: "For high mileage cyclists",
      visits: "4 visits/month",
      price: "650 DKK/month",
      color: "bg-yellow-200",
      features: ["All from Complete", "Minor replacements", "Full technical check"],
    },
    {
      title: "Complete",
      subtitle: "Great for regular commuters",
      visits: "2 visits/month",
      price: "400 DKK/month",
      color: "bg-green-200",
      features: ["All from Basic", "Chain lubrication", "Wheel truing"],
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
        <BikeDropHero />
        <ServiceFeatures />
        <PlansSection plans={plans} />
        <CTASection />
        <Footer />
      </motion.div>
    </>
  );
}

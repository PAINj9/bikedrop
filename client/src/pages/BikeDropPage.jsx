import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ✅ Import optimizado desde el index.js de BikeDropPage
import {
  BikeDropHero,
  ServiceFeatures,
  PlansSection,
  CTASection,
  Testimonials,
  HowItWorks,
} from "../components/BikeDropPage";

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
      title: "Pro",
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

  useEffect(() => {
    const anchor = localStorage.getItem("scrollToAnchor");
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 350); // Delay para asegurar render
      }
      localStorage.removeItem("scrollToAnchor");
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

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
        <HowItWorks />
        <Testimonials />
        <CTASection />
        <Footer />
      </motion.div>
    </>
  );
}

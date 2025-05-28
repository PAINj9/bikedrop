// CTASection.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.1 }}
      className="text-center py-20 px-6 md:px-20 scroll-mt-14"
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
  );
}

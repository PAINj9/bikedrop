import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <motion.section
      id="about"
      initial={false}
      animate={false}
      className="text-center py-20 px-6 md:px-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: false }}
        className="text-3xl font-semibold mb-4"
      >
        Ready to ride?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.18, ease: "easeOut" }}
        viewport={{ once: false }}
        className="mb-6 text-gray-600"
      >
        Book online or message us on WhatsApp in under 2 minutes.
      </motion.p>
      <Link to="/book">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          className="bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800"
        >
          Book Now
        </motion.button>
      </Link>
    </motion.section>
  );
}

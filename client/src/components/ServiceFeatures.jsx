import { motion } from "framer-motion";

const services = [
  {
    icon: "🛠️",
    title: "Tune-Ups",
    description: "Comprehensive service to optimize your bike’s performance.",
  },
  {
    icon: "🔧",
    title: "Repairs",
    description: "Fixing any issues, from flat tires to brake adjustments.",
  },
  {
    icon: "🧼",
    title: "Cleaning",
    description: "Thorough cleaning to keep your bike in top condition.",
  },
];

export default function ServiceFeatures() {
  return (
    <motion.section
      id="services"
      className="py-20 px-6 md:px-20 bg-gray-100 scroll-mt-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      <h2 className="text-3xl font-semibold text-center mb-12">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-10 text-center">
        {services.map((service, i) => (
          <div key={i}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-5xl mb-4"
              style={{
                display: "inline-block",
                filter: "drop-shadow(0 0 8px rgba(59,130,246,0.6))",
              }}
            >
              {service.icon}
            </motion.div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

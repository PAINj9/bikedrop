import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function BikeDropHero() {
  return (
    <section
      className="relative w-full overflow-hidden min-h-[420px] flex flex-col md:flex-row items-stretch bg-gradient-to-tr from-blue-50 via-blue-100 to-white"
    >
      {/* Imagen para MOBILE (arriba del texto, con efecto hover/tap) */}
      <div className="block md:hidden w-full h-56 mb-6">
        <motion.img
          src="/bikedrop/bike-hero.jpg" // Ruta corregida para GitHub Pages subcarpeta
          alt="Woman riding a bike"
          className="w-full h-full object-cover rounded-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
        />
      </div>

      {/* Imagen para DESKTOP (derecha, diagonal, con efecto hover) */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-3/5 h-full z-10">
        <motion.img
          src="/bikedrop/bike-hero.jpg" // Ruta corregida para GitHub Pages subcarpeta
          alt="Woman riding a bike"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center 0", // Bajá más si querés
            clipPath: "polygon(13% 0, 100% 0, 100% 100%, 0 100%)"
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
        />
      </div>

      {/* TEXTO HERO */}
      <div className="relative z-20 w-full md:w-1/2 px-6 md:px-20 py-16 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="uppercase text-sm text-blue-600 tracking-wide mb-2 font-semibold"
        >
          NEW IN AARHUS 🚴
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
        >
          We Take Care of Your <span className="text-blue-600">Bike</span>, Wherever You Are
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: false }}
          className="text-lg text-gray-700 mb-6 max-w-xl"
        >
          BikeDrop is a mobile bike maintenance service based in Aarhus. We come to you — offering flexible subscription plans tailored to your riding style. From quick tune-ups and regular cleaning to full technical repairs, your bike stays in top shape, so you can just enjoy the ride.
        </motion.p>
        <Link to="/book">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
          >
            Book Now
          </motion.button>
        </Link>
      </div>
    </section>
  );
}

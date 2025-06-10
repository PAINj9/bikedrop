import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import bikeHero from "../../assets/BikeService.png";

export default function BikeDropHero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[420px] flex flex-col md:flex-row items-stretch bg-gradient-to-tr from-blue-50 via-blue-100 to-white">

      <div className="md:hidden absolute inset-0 w-full h-screen min-h-[500px] z-0">
        <img
          src={bikeHero}
          alt="Woman riding a bike"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 20%" }}
        />
        <div className="absolute inset-0 backdrop-blur-[15px] bg-gradient-to-b from-blue-900/60 via-blue-700/10 to-white/60" />
      </div>


      <div className="md:hidden relative z-10 flex flex-col items-center justify-center w-full h-screen min-h-[500px] py-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="uppercase text-sm text-white tracking-wide mb-2 font-semibold drop-shadow-lg"
        >
          NEW IN AARHUS 🚴
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold leading-tight mb-5 text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)]"
        >
          We Take Care of Your <span className="text-blue-200">Bike</span>, Wherever You Are
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-base text-white mb-6 max-w-md mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
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
        {/* Scroll Indicator animado */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
          className="absolute bottom-6 left-0 w-full flex justify-center pointer-events-none"
        >
          <ChevronDown className="animate-bounce w-9 h-9 text-blue-400 drop-shadow" />
        </motion.div>
      </div>

      <div className="hidden md:block absolute inset-y-0 right-0 w-3/5 h-full z-10">
        <motion.img
          src={bikeHero}
          alt="Woman riding a bike"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center 3",
            clipPath: "polygon(13% 0, 100% 0, 100% 100%, 0 100%)"
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
        />
      </div>
      <div className="hidden md:flex relative z-20 w-full md:w-1/2 px-6 md:px-20 py-16 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="uppercase text-sm text-blue-600 tracking-wide mb-2 font-semibold"
        >
          NEW IN AARHUS 🚴
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
        >
          We Take Care of Your <span className="text-blue-600">Bike</span>, Wherever You Are
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
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

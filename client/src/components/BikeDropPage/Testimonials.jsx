import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const testimonials = [
  {
    name: "Sophie M.",
    stars: 5,
    text: "I loved BikeDrop’s service. Super friendly, on time and my bike felt brand new. Highly recommend!",
  },
  {
    name: "Mark R.",
    stars: 5,
    text: "Great experience! They came to my place and fixed everything quickly. Hassle-free and professional.",
  },
  {
    name: "Emma D.",
    stars: 5,
    text: "Every time I need a tune-up or a fix, I call BikeDrop. Always fast and reliable service.",
  },
  {
    name: "Lucas W.",
    stars: 5,
    text: "Excellent communication and quality. Didn’t have to leave home, and my bike was ready in no time.",
  },
];

function Stars({ count }) {
  return <div className="text-red-600 text-lg mb-2">{"★".repeat(count)}</div>;
}

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayRef = useRef();
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 16,
    },
    loop: true,
    dragSpeed: 1.1,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 28 },
      },
    },
  });

  // Autoplay
  useEffect(() => {
    let timeout;
    const next = () => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
      timeout = setTimeout(next, 3000);
    };
    timeout = setTimeout(next, 3000);
    autoplayRef.current = timeout;
    return () => clearTimeout(timeout);
  }, [instanceRef]);

  return (
    <motion.section
      className="my-16 bg-white"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false }}
    >
      <h2 className="text-3xl font-bold italic text-center mb-12">
        What People Are Saying
      </h2>

      {/* ✅ MOBILE: Carrusel corregido */}
      <div className="block md:hidden px-4 overflow-visible">
        <div ref={sliderRef} className="keen-slider overflow-visible pb-10">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="keen-slider__slide w-full flex justify-center pt-4 overflow-visible"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="w-full max-w-xs bg-white rounded-2xl shadow-xl px-5 py-6 text-center mb-6">
                <div className="font-semibold mb-1 text-base">{t.name}</div>
                <Stars count={t.stars} />
                <div className="italic text-gray-600 text-base">{t.text}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots Pagination */}
        <div className="flex justify-center gap-2 mt-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === idx
                  ? "bg-blue-500 scale-110 shadow"
                  : "bg-blue-200"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ✅ DESKTOP: No se toca */}
      <div className="hidden md:flex flex-wrap justify-center gap-10 mt-10">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-lg px-5 py-6 max-w-xs min-w-[200px] text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="font-semibold mb-1 text-base">{t.name}</div>
            <Stars count={t.stars} />
            <div className="italic text-gray-600 text-base">{t.text}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

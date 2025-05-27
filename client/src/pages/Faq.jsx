import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

const faqs = [
  {
    question: "Where does BikeDrop operate?",
    answer:
      "We currently offer doorstep service in Aarhus, Denmark. We're planning to expand to more cities soon.",
  },
  {
    question: "How do the subscription plans work?",
    answer:
      "You can choose from monthly plans with 1, 2, or 4 visits per month. Each visit includes services based on the selected plan.",
  },
  {
    question: "What if I need an urgent repair?",
    answer:
      "Contact us! We always try to handle emergencies the same day or the next.",
  },
  {
    question: "Can I pause or cancel my subscription?",
    answer:
      "Yes! You can pause or cancel at any time through your account or by contacting us directly.",
  },
  {
    question: "What’s included in a maintenance visit?",
    answer:
      "Depending on the plan, a visit may include cleaning, brake and gear adjustments, chain lubrication, wheel truing, and more.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>BikeDrop | FAQ</title>
      </Helmet>

      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        <div className="max-w-4xl mx-auto py-16 px-6">
          <h1 className="text-3xl font-bold mb-10 text-center">
            Frequently Asked Questions
          </h1>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium hover:bg-gray-50 transition"
                >
                  {faq.question}
                  <span className="text-2xl leading-none">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { height: "auto", opacity: 1 },
                        collapsed: { height: 0, opacity: 0 },
                      }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 pb-4 pt-1 text-gray-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;

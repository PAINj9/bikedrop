import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

      <div className="min-h-screen flex flex-col bg-white text-gray-800">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          className="max-w-4xl mx-auto py-16 px-6 flex-grow"
        >
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
                        open: {
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.5, ease: [0.77, 0, 0.175, 1] },
                            opacity: { duration: 0.4, delay: 0.08, ease: "easeInOut" }
                          }
                        },
                        collapsed: {
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.5, ease: [0.77, 0, 0.175, 1] },
                            opacity: { duration: 0.25, ease: "easeInOut" }
                          }
                        }
                      }}
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
        </motion.div>

        <Footer />
      </div>
    </>
  );
};

export default Faq;

import { motion } from "framer-motion";
import { Loader } from "lucide-react";

export default function SubmitButtonWithLoader({ loading, disabled }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl text-lg shadow-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
      disabled={disabled}
    >
      {loading ? (
        <>
          <Loader className="animate-spin" size={22} />
          Confirming...
        </>
      ) : (
        "Confirm Appointment"
      )}
    </motion.button>
  );
}

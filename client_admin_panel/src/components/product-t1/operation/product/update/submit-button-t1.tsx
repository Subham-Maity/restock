import React from "react";
import { motion } from "framer-motion";
import { FaSave } from "react-icons/fa";

const SubmitButtonT1 = () => {
  return (
    <motion.button
      type="submit"
      className="rounded-md bg-indigo-600 px-3 py-2 mt-1 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 "
      whileHover={{
        scale: 1.05,
        backgroundColor: "#4A90E2",
        transition: {
          duration: 0.2,
        },
      }}
    >
      <motion.span
        initial={{ rotate: 0 }}
        whileHover={{
          rotate: 360,
          transition: {
            duration: 0.5,
          },
        }}
        transition={{ duration: 0.5 }}
        className="inline-block mr-1 "
      >
        <FaSave />
      </motion.span>
      Save
    </motion.button>
  );
};

export default SubmitButtonT1;

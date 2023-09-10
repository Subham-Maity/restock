"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";
import { motion } from "framer-motion";

const Switcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div>
      {/* The current theme is: {theme} */}
      <motion.button
        id="theme-btn"
        aria-label="Toggle Dark Mode"
        className="text-2xl ml-auto flex-shrink-0 rounded-xl bg-gray-500 hover:bg-gray-600 p-1.5 text-white dark:bg-gray-700 dark:hover:text-white dark:hover:bg-gray-600 drop focus:outline-none focus:ring-0 focus:ring-white/75 focus:ring-offset-0 focus:ring-offset-gray-800"
        whileTap={{
          scale: 0.7,
          rotate: 360,
          transition: { duration: 0.2 },
        }}
        whileHover={{ scale: 1.2 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <BsMoonFill /> : <BsFillSunFill />}
      </motion.button>
    </div>
  );
};
export default Switcher;

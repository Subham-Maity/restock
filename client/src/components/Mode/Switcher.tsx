"use client";
import { useTheme } from "next-themes";
import { useEffect, useContext, useState } from "react";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Context from "@/lib/context/Context";

const Switcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = useContext(Context);

  useEffect(() => {
    setMounted(true);
    setIsDarkTheme(theme === "dark");
  }, [theme]);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div>
      <motion.button
        id="theme-btn"
        aria-label="Toggle Dark Mode"
        className="text-2xl ml-auto rounded-full bg-gray-500 hover:bg-gray-600 p-2 text-white dark:bg-gray-700
                      dark:hover:text-white dark:hover:bg-gray-600 drop hover:cursor-pointer cursor-pointer"
        whileTap={{
          scale: 1,
          rotate: 360,
          transition: { duration: 0.4 },
        }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <BsMoonFill /> : <BsFillSunFill />}
      </motion.button>
    </div>
  );
};
export default Switcher;

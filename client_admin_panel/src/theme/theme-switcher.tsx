"use client";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Context from "@/store/context/context";
import DayNightToggle from "react-day-and-night-toggle";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { setIsDarkTheme } = useContext(Context);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
    setIsDarkTheme(isDarkMode);
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
      <DayNightToggle
        className="w-3 h-1"
        onChange={() => setTheme(isDarkMode ? "light" : "dark")}
        checked={isDarkMode}
      />
    </div>
  );
};
export default ThemeSwitcher;

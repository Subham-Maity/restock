import React from "react";
import { motion } from "framer-motion";
import MemoryTab from "@/components/nav/memory-tab/memory-tab";
const MemoryTabLayout = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <motion.div
      animate={
        isSidebarOpen
          ? { width: "84vw", transition: { duration: 0.3 } }
          : typeof window !== "undefined" && window.innerWidth > 1024
            ? { width: "97vw", transition: { duration: 0.3 } }
            : { width: "100vw", transition: { duration: 0.3 } }
      }
      className={`hidden lg:block fixed lg:top-16 top-0 z-40 w-full dark:shadow-sm shadow-lg h-8 backdrop-brightness-50 dark:bg-stone-700/40 bg-[#dddfe1] bg-no-repeat bg-cover bg-fixed border dark:border-[#e5e7eb]/10 border-gray-700/10`}
    >
      <MemoryTab />
    </motion.div>
  );
};

export default MemoryTabLayout;

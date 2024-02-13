"use client";

// Components import
import React, { useState } from "react"; // Libraries import
import { motion } from "framer-motion";
import SideNavbar from "@/components/common/home/home-side-nav/desktop-side-nav";
import AdminHomeTopNav from "@/components/common/home/home-top-nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="">
      <SideNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <motion.div
        className={`${" m-0"} w-auto  dark:border-0   lg:rounded-lg flex flex-col items-center justify-center`}
        transition={{ duration: 0.3 }}
        animate={
          isSidebarOpen
            ? { marginLeft: "16.5rem", transition: { duration: 0.3 } }
            : typeof window !== "undefined" && window.innerWidth > 1024
              ? { marginLeft: "4.5rem", transition: { duration: 0.3 } }
              : { marginLeft: "0rem", transition: { duration: 0.3 } }
        }
      >
        <div className="w-full justify-center items-center">
          <div className="w-full hidden lg:flex bg-transparent backdrop-blur-sm fixed top-0 z-50 "></div>
          <AdminHomeTopNav
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className={` w-full min-h-full `}>{children}</div>
      </motion.div>
    </div>
  );
};

export default Layout;

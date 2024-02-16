"use client";

// Components import
import React, { useState } from "react"; // Libraries import
import { motion } from "framer-motion";
import SideNavbar from "@/components/nav/sidenav/desktop-side-nav";
import AdminHomeTopNav from "@/components/nav/top-nav";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/shadcn/context-menu";
import RightClickNavMain from "@/components/nav/right-click-nav/right-click-nav-main";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="">
      <SideNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <motion.div
        className={`w-auto dark:border-0 lg:rounded-lg flex flex-col items-center justify-center`}
        transition={{ duration: 0.3 }}
        animate={
          isSidebarOpen
            ? { marginLeft: "20.0rem", transition: { duration: 0.3 } }
            : typeof window !== "undefined" && window.innerWidth > 1024
              ? { marginLeft: "4.0rem", transition: { duration: 0.3 } }
              : { marginLeft: "0rem", transition: { duration: 0.3 } }
        }
      >
        <div className="w-full justify-center items-center">
          <AdminHomeTopNav isSidebarOpen={isSidebarOpen} />
        </div>
        <div className={` w-full min-h-full px-6`}>
          <RightClickNavMain>{children}</RightClickNavMain>
        </div>
      </motion.div>
    </div>
  );
};

export default Layout;

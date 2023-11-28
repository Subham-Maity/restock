"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/admin/components/AdminNav/Navbar";
import SideNavbar from "@/app/components/admin/components/AdminNav/SideNav";

const DefaultNav = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div className=" dark:bg-[#202329] bg-stone-400/25 select-animate bg-cover bg-no-repeat bg-center h-screen">
        <div className=" overflow-hidden max-h-screen ">
          <div className="flex">
            <div className="lg:flex lg:mt-16 lg:mr-2">
              <SideNavbar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </div>
            <div>
              <Navbar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
              <div className=" lg:max-h-[90vh] max-h-[98vh] overflow-y-scroll w-full h-screen rounded-4xl mt-20">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultNav;

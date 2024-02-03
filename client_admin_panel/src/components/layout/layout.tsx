"use client";
import React, { useState } from "react";
import SideNavbar from "@/components/common/home/home-side-nav";
import AdminHomeTopNav from "@/components/common/home/home-top-nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="overflow-hidden">
      <div className=" dark:bg-[#202329] bg-stone-400/25 select-animate bg-cover bg-no-repeat bg-center h-screen">
        <div className="max-h-screen ">
          <div className="flex">
            <div className="lg:flex lg:mt-16 lg:mr-2">
              <SideNavbar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </div>
            <div>
              <AdminHomeTopNav
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
              <div className=" lg:max-h-[90vh] max-h-screen lg:pb-0 pb-16 h-screen overflow-y-scroll rounded-4xl mt-20">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

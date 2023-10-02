import React from "react";

import Sidebar from "./SideNav";
import TopNavbar from "@/app/components/Navbar/Navbar";
import AdminNavbar from "@/app/components/admin/components/AdminNav/Navbar";


const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 mt-16">
          <div>
            <Sidebar />
          </div>
          <div className="flex-1 overflow-x-hidden dark:bg-[#2b2d30] bg-stone-200/25 lg:border lg:dark:border-white/25 lg:border-gray-800/25 lg:m-4 lg:mt-6 rounded-lg">
            {children}
          </div>
        </div>
       <AdminNavbar />
      </div>
    </>
  );
};

export default DefaultLayout;

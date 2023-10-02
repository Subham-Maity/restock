import React from "react";

import Sidebar from "./SideNav";
import TopNavbar from "@/app/components/Navbar/Navbar";
import AdminNavbar from "@/app/components/admin/components/AdminNav/Navbar";


const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col h-fit dark:bg-stone-800 bg-stone-400/25">
        <div className="flex flex-1 mt-16">
          <div>
            <Sidebar />
          </div>
          <div className="flex-1 overflow-x-hidden lg:m-2 lg:mt-6 rounded-lg p-2">
            {children}
          </div>
        </div>
       <AdminNavbar />
      </div>
    </>
  );
};

export default DefaultLayout;

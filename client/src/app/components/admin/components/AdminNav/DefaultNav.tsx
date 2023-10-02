import React from "react";

import Sidebar from "./SideNav";
import Navbar from "@/app/components/Navbar/Navbar";


const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1 mt-16">
                <div>
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-x-hidden dark:bg-stone-600/25 bg-stone-200/25 lg:border-8 lg:border-gray-400/25 lg:m-8 rounded-2xl shadow-lg">{children}</div>
            </div>
            <div>
              <Navbar/>
            </div>
        </div>
    );
};

export default DefaultLayout;

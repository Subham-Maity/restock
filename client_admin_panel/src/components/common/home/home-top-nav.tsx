"use client";
import { RiMenu2Fill } from "react-icons/ri";
import ThemeSwitcher from "@/theme/theme-switcher";

import React, { useState } from "react";
import { selectUserInfo } from "@/lib/features/own/own-details/own-details-slice";
import { useAppSelector } from "@/store/redux/useSelector";
import MobileSidebar from "@/components/common/home/home-side-nav/mobile-side-nav";
import { DropdownMenuCustom } from "@/components/ui/custom-dropdown/nav-custom-dropdown";
import { motion } from "framer-motion";
import { globalBgConfig } from "@/app/global-bg-config";

const AdminHomeTopNav = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const user = useAppSelector(selectUserInfo);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  return (
    <motion.div
      animate={
        isSidebarOpen
          ? { width: "85vw", transition: { duration: 0.3 } }
          : typeof window !== "undefined" && window.innerWidth > 1024
            ? { width: "97vw", transition: { duration: 0.3 } }
            : { width: "100vw", transition: { duration: 0.3 } }
      }
      className={`fixed lg:top-0 top-0 z-40 w-full dark:shadow-sm shadow-lg h-16 bg-[url('/sidebar/sidebar-bg2.svg')]  bg-no-repeat bg-cover bg-fixed border-b border-dotted border-[#0ac31c]/20 dark:border-[#7BFE88]/20`}
    >
      <div className="flex h-12 items-end justify-between ">
        <div className=" flex items-center space-x-4 gap-0 lg:gap-0">
          <div className="flex items-start ml-2 mt-2 mb-2">
            {openMobileNav && (
              <MobileSidebar
                onClose={(value) => setOpenMobileNav(value)}
                isSidebarOpen={openMobileNav}
              />
            )}
            <RiMenu2Fill
              size={25}
              className="hover:cursor-pointer text-white lg:hidden"
              onClick={() => {
                setOpenMobileNav(true);
              }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="mt-1">
            <ThemeSwitcher />
          </div>

          <div className=" ml-auto">
            <div className="ml-4 flex items-center md:ml-6 mr-6">
              <DropdownMenuCustom {...user} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminHomeTopNav;

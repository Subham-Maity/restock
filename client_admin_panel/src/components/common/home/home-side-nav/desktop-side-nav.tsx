"use client";
import React, { useEffect, useState } from "react";
import {
  defaultTextClasses,
  sideNavBgColorDesktop,
} from "@/components/common/home/home-side-nav/config/side-nav-setting";
import { SidebarProps } from "@/components/common/home/home-side-nav/config/sidenav-interface";
import SidenavNavLinkControl from "@/components/common/home/home-side-nav/core/sidenav-nav-link-control";
import SidenavOpenCloseDesk from "@/components/common/home/home-side-nav/core/sidenav-open-close";

const SideNavbar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(isSidebarOpen);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsNavOpen(isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <>
      {isNavOpen !== null ? (
        <nav
          className={`overflow-hidden hidden z-40 bg-transparent bg-no-repeat bg-cover lg:flex flex-col justify-between fixed duration-300 top-0 bg-stone-100 `}
        >
          <div
            className={`${
              open ? "w-[16rem] fixed h-full" : "w-[4rem]"
            } fixed h-full bg-opacity-10 bg-transparent  shadow-xl dark:shadow-sm ${sideNavBgColorDesktop} ${defaultTextClasses} duration-300 left-0 flex flex-col overflow-y-auto`}
          >
            <div
              className={`z-50 cursor-pointer dark:bg-[#2b313a] dark:bg-transparent m-2 flex items-center justify-center bg-sidebar rounded-full`}
              onClick={() => {
                setOpen(!open);
                toggleSidebar(!open);
              }}
            >
              <SidenavOpenCloseDesk open={open} />
            </div>
            <SidenavNavLinkControl open={open} />
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default SideNavbar;

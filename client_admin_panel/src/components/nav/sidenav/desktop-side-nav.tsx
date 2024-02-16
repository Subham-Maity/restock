"use client";
import React, { useEffect, useState } from "react";
import { SidebarProps } from "@/components/nav/sidenav/config/sidenav-interface";
import SidenavNavLinkControl from "@/components/nav/sidenav/core/sidenav-nav-link-control";
import SidenavOpenCloseDesk from "@/components/nav/sidenav/core/sidenav-open-close";
import {
  defaultTextClasses,
  sideNavBgColorDesktop,
} from "@/components/nav/sidenav/config/side-nav-style";

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
              open ? "w-[20rem] fixed h-full" : "w-[4rem]"
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

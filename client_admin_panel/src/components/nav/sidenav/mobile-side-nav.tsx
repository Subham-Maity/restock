"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { motion } from "framer-motion";
import SidenavNavLinkControl from "@/components/nav/sidenav/core/sidenav-nav-link-control";
import { Props } from "@/components/nav/sidenav/config/sidenav-interface";
import {
  headingClasses,
  headingName,
  sideNavBgColorMobile,
} from "@/color/side-nav-style";

const MobileSidebar = (props: Props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(props.isSidebarOpen);
  }, [props.isSidebarOpen]);

  return (
    <>
      <aside>
        <motion.div className={`fixed top-0 left-0 w-full h-full z-50`}>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ x: "-100%" }}
            className={`fixed top-0 left-0 w-64 h-full ${sideNavBgColorMobile} z-50`}
          >
            <div className="flex flex-col justify-between items-center p-4 ">
              <div className="flex items-center justify-between w-full">
                {open && <h1 className={headingClasses}>{headingName}</h1>}
                <button
                  onClick={() => props.onClose(false)}
                  className="dark:text-white focus:outline-none lg:hidden"
                >
                  <AiOutlineMenuUnfold size={25} />
                </button>
              </div>
            </div>
            <SidenavNavLinkControl open={open} />
          </motion.div>
        </motion.div>
      </aside>
    </>
  );
};

export default MobileSidebar;

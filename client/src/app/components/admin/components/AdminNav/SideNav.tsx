"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineRocket,
  AiOutlineUnlock,
  AiOutlineCrown,
  AiOutlineRobot,
  AiOutlineHome,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import {
  BsFillShieldFill,
  BsTelegram,
  BsTwitter,
  BsFacebook,
} from "react-icons/bs";
import { BiPaperPlane } from "react-icons/bi";
import {FaUserSecret, FaChartLine, FaCaretRight} from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import {RiComputerLine, RiFileLine, RiMenu2Fill} from "react-icons/ri";
import { GiParachute } from "react-icons/gi";
import Link from "next/link";
import {TbSquareRoundedArrowRightFilled} from "react-icons/tb";
interface NavItem {
  title: string;
  href: string;
  icon?: JSX.Element;
  subNav?: NavItem[];
}

const navConfig: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <AiOutlineHome />,
  },
  {
    title: "Products",
    href: "#",
    icon: <RiComputerLine />,
    subNav: [
      {
        title: "Products List",
        href: "/admin",
        icon:<FaCaretRight />
      },
      {
        title: "Table View",
        href: "/admin/table",
        icon:<FaCaretRight />
      }
    ],
  }
];
interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}
const SideNavbar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const [showSidebar, setShowSidebar] = useState(isSidebarOpen);
  const [activeSubNav, setActiveSubNav] = useState<string | null>(null);
  const [activeSubNavItem, setActiveSubNavItem] = useState<string | null>(null);
  const [selectedNoSubNav, setSelectedNoSubNav] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(isSidebarOpen);
  const [open, setOpen] = useState(false);
  const handleSubNavItemClick = (title: string) => {
    setActiveSubNavItem(title);
    setSelectedNoSubNav(null);
  };
  useEffect(() => {
    setIsNavOpen(isSidebarOpen);
  }, [isSidebarOpen]);
  const handleSubNavToggle = (title: string) => {
    setActiveSubNav((prevActiveSubNav) =>
      prevActiveSubNav === title ? null : title,
    );
  };
  const handleSidebarToggle = () => {
    toggleSidebar(); // Call the function to toggle the sidebar
  };
  const handleNoSubNavClick = (title: string) => {
    setActiveSubNav(null);
    setSelectedNoSubNav(title);
  };

  return (
    <>
      {!isNavOpen ? (
        <motion.nav
          initial={{ width: 0 }}
          animate={{ width: !isNavOpen ? "220px" : "auto" }}
          transition={{ duration: 0.1 }}
          className={`overflow-hidden h-screen ${
            isNavOpen
              ? "w-auto fixed lg:relative "
              : "w-[220px] fixed lg:relative"
          } z-40 lg:block h-screen lg:dark:bg-transparent lg:mt-0 mt-16 bg-no-repeat bg-cover dark:text-white text-black flex flex-col justify-between lg:relative duration-300 `}
        >
          <div
            className={`${
              open ? "w-[220px]" : "w-12"
            }  dark:bg-[#2b3039]  bg-stone-200/25 h-screen border dark:border-gray-400/25 border-gray-800/25  text-gray-900 dark:text-gray-300 relative duration-300 `}
          >
            <div
              className={`absolute cursor-pointer -right-3 dark:bg-[#2b313a] dark:bg-gradient-to-r dark:from-transparent bg dark:to-stone-400/25 dark:bg-transparent top-9 w-10 h-10 text-gray-900 dark:text-gray-300 flex items-center justify-center bg-sidebar border border-stone-400 dark:border-stone-400/25 rounded-full ${
                !isNavOpen && "rotate-180"
              }`}
              onClick={() => setOpen(!open)}
            >
              <AiOutlineMenuUnfold
                className={`text-gray-900 dark:text-gray-300  ${
                    isNavOpen ? "text-2xl " : "text-3xl"
                }`}
              />
            </div>
            <div>
              <div className={`${
                  !open ? "py-0" : "py-2 my-4 dark:bg-gradient-to-r dark:from-transparent bg dark:to-stone-400/25 dark:bg-transparent font-bold text-lg text-gray-900 dark:text-gray-300 duration-200"
              }`}>
                <h1
                  className={` mt-4 origin-left px-4 mb-6  ${
                      !open && "scale-0"
                  }`}
              >
                AdminOnly
              </h1>
              </div>

              <div className="flex flex-col items-center justify-between z-50 overflow-y-auto ">



                <ul
                  className={`${
                    !isNavOpen ? "flex" : "hidden"
                  } w-full lg:flex flex-col gap-0 font-medium`}
                >
                  {navConfig.map((item) => (
                    <motion.li
                      key={item.title}
                      initial={{ x: -200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {item.subNav && item.subNav.length > 0 ? (
                        <div
                          className={`group flex items-center px-4 py-2 ${
                            item.href === "/"
                              ? "bg-gray-200 dark:bg-transparent"
                              : ""
                          } ${
                            activeSubNav === item.title
                              ? "dark:bg-gradient-to-r dark:from-transparent bg dark:to-stone-400/25 dark:bg-transparent text-gray-300 border-r-2 dark:border-r-gray-400/75 cursor-pointer"
                              : ""
                          }`}
                          onClick={() => handleSubNavToggle(item.title)}
                        >
                          <div className="mr-3 text-xl">{item.icon}</div>
                          <span>{item.title}</span>
                          {activeSubNav === item.title ? (
                            <FiChevronDown className="ml-auto w-4 h-4" />
                          ) : (
                            <FiChevronRight className="ml-auto w-4 h-4" />
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`group flex items-center px-4 py-3  ${
                            item.href === "/"
                              ? "bg-gray-200 dark:bg-transparent"
                              : ""
                          } ${
                            selectedNoSubNav === item.title
                              ? "dark:bg-gradient-to-r dark:from-transparent dark:to-stone-400/25 dark:bg-transparent text-stone-300 border-r-2 dark:border-r-gray-400/75 cursor-pointer"
                              : ""
                          }`}
                          onClick={() => handleNoSubNavClick(item.title)}
                        >
                          <div className="mr-3 text-xl">{item.icon}</div>
                          <span>{item.title}</span>
                        </Link>
                      )}
                      {item.subNav && activeSubNav === item.title && (
                        <ul className="pl-8 space-y-1 mt-2">
                          {item.subNav.map((subItem) => (
                            <motion.li
                              key={subItem.title}
                              initial={{ x: -200, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Link
                                href={subItem.href}cursor-pointer
                                className={`flex items-center px-4 py-2 whitespace-nowrap ${
                                  activeSubNavItem === subItem.title
                                    ? "dark:bg-gradient-to-r dark:from-transparent dark:to-stone-400/25 dark:bg-transparent text-stone-300 border-r-2 dark:border-r-gray-400/75 cursor-pointer"
                                    : ""
                                } hover:dark:bg-gradient-to-r dark:from-transparent dark:to-stone-400/25 dark:bg-transparent `}
                                onClick={() =>
                                  handleSubNavItemClick(subItem.title)
                                }
                              >
                                {subItem.icon && (
                                  <div className="mr-3 text-xl">
                                    {subItem.icon}
                                  </div>
                                )}
                                {subItem.title}
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.nav>
      ) : null}
    </>
  );
};

export default SideNavbar;

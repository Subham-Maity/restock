"use client";
import { useState } from "react";
import {
  AiOutlineDown,
  AiOutlineMenuUnfold,
  AiOutlineLeft,
} from "react-icons/ai";
import { motion } from "framer-motion";
import Link from "next/link";
import {IoDocumentTextOutline, IoShareSocialSharp} from "react-icons/io5";
import {BsGpuCard, BsTelegram} from "react-icons/bs";
import { LuTwitter } from "react-icons/lu";

const Menus = [
  {
    title: "Pc Components Admin",
    icon: BsGpuCard,
    href: "/admin",
    gap: true,
  },
  {
    title: "Admin Form",
    image: "Navbar/form.svg",
    icon: IoDocumentTextOutline,
    href: "/admin/adminForm",
    gap: true,
  },
  {
    title: "Socials",
    icon: IoShareSocialSharp,
    href: "",
    gap: true,
    subNav: [
      {
        title: "Telegram",
        icon: BsTelegram,
        href: "/accounts/settings",
      },
      {
        title: "Twitter",
        icon: LuTwitter,
        href: "/accounts/settings",
      },
    ],
  },
];

const subNavVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: -10,
  },
};

const SubNav = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const toggleArrow = (index:number) => {
    return index === active && open ? (
        <AiOutlineDown className="text-sm font-light text-gray-900 dark:text-gray-300" />
    ) : (
        <AiOutlineLeft className="text-sm font-light text-gray-900 dark:text-gray-300" />
    );
  };

  return (
      <div className="stickyClass top-[calc(100px+0.5rem)] lg:block md:block hidden ">
        <div
            className={`${
                open ? "w-80" : "w-16"
            }  dark:bg-[#2b2d30] bg-stone-200/25 border rounded-2xl lg:border lg:dark:border-white/25 lg:border-gray-800/25 h-[2000px] p-3 pt-8 text-gray-900 dark:text-gray-300 relative duration-300 `}
        >
          <div
              className={`absolute cursor-pointer -right-3 top-9 w-10 h-10 text-gray-900 dark:text-gray-300 flex items-center justify-center bg-sidebar border-2 border-stone-400 dark:border-stone-800 rounded-full ${
                  !open && "rotate-180"
              }`}
              onClick={() => setOpen(!open)}
          >
            <AiOutlineMenuUnfold
                className={`text-gray-900 dark:text-gray-300 ${
                    open ? "text-2xl" : "text-3xl"
                }`}
            />
          </div>
          <div className="flex items-center">
            <h1
                className={`mt-3 origin-left font-bold text-lg text-gray-900 dark:text-gray-300 duration-200 ${
                    !open && "scale-0"
                }`}
            >
              Admin Panel
            </h1>
          </div>
          <ul className="pt-2">
            {Menus.map((Menu, index) => {
              const IconOrImage = Menu.icon || Menu.image; // Use Menu.icon if available, otherwise use Menu.image
              const isIcon = !!Menu.icon;

              return (
                  <li
                      key={index}
                      className={`flex flex-col rounded-md p-2 cursor-pointer text-gray-900 dark:text-gray-300 text-sm ${
                          open ? "flex-container gap-x-4 mt-4" : "mt-2"
                      } ${
                          index === active &&
                          !Menu.subNav &&
                          "bg-slate-300 dark:bg-[#5b5d61]"
                      } `}
                      onClick={() => setActive(index)}
                      style={{
                        fontWeight:
                            index === active && !Menu.subNav ? "bold" : "normal",
                        color:
                            index === active && !Menu.subNav ? "#2a2a2a" : "#545454",
                      }}
                  >
                    <div
                        className={`${
                            open ? "flex" : ""
                        } items-center gap-x-4 text-gray-900 dark:text-gray-300`}
                    >
                      <Link href={Menu.href}>
                        <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.8, rotate: -10 }}
                        >
                          {IconOrImage && isIcon ? (
                              <IconOrImage
                                  className={`${isIcon ? "text-xl" : "h-6 w-6"}`}
                              />
                          ) : IconOrImage ? (
                              <img
                                  src={IconOrImage}
                                  alt={Menu.title}
                                  className="h-6 w-6"
                              />
                          ) : null}
                        </motion.div>
                      </Link>
                      <Link href={Menu.href}>
                    <span
                        className={`${
                            !open && "hidden"
                        } origin-left duration-200`}
                    >
                      {Menu.title}
                    </span>
                      </Link>
                      {open && Menu.subNav && toggleArrow(index)}
                    </div>
                    {Menu.subNav && (
                        <motion.ul
                            variants={subNavVariants}
                            initial="closed"
                            animate={index === active && open ? "open" : "closed"}
                            className="flex flex-col text-gray-900 dark:text-gray-300 w-full pl-10"
                        >
                          {Menu.subNav.map((subItems, subIndex) => {
                            const SubIcon = subItems.icon;
                            return (
                                <motion.li
                                    key={subIndex}
                                    variants={itemVariants}
                                    className="flex items-center gap-x-4 py-1 mt-4"
                                    style={{
                                      backgroundColor:
                                          index === active && subIndex === active
                                              ? " #f5f5f5 "
                                              : "transparent",
                                      fontWeight:
                                          index === active && subIndex === active
                                              ? "bold"
                                              : "normal",
                                    }}
                                    onClick={() => setActive(subIndex)}
                                >
                                  <Link href={subItems.href}>
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        whileTap={{ scale: 0.8, rotate: -10 }}
                                    >
                                      {SubIcon && (
                                          <SubIcon className="text-xl text-gray-900 dark:text-gray-300" />
                                      )}
                                    </motion.div>
                                  </Link>
                                  <Link href={subItems.href}>
                                    <span>{subItems.title}</span>
                                  </Link>
                                </motion.li>
                            );
                          })}
                        </motion.ul>
                    )}
                  </li>
              );
            })}
          </ul>
        </div>
      </div>
  );
};

export default SubNav;

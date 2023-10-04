"use client";
import { useState } from "react";
import {
  AiOutlineDown,
  AiOutlineMenuUnfold,
  AiOutlineLeft,
  AiOutlineHome,
  AiOutlineEdit,
} from "react-icons/ai";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoShareSocialSharp } from "react-icons/io5";
import { BsGpuCard, BsTelegram } from "react-icons/bs";
import { LuTwitter } from "react-icons/lu";

type MenuItem = {
  title: string;
  image?: string;
  icon?: any;
  href?: string;
  gap?: boolean;
  subNav?: MenuItem[];
};

const Menus: MenuItem[] = [
  {
    title: "Home Page",
    image: "Navbar/form.svg",
    icon: AiOutlineHome,
    href: "/",
    gap: true,
  },
  {
    title: "Pc Components",
    icon: BsGpuCard,
    gap: true,
    subNav: [
      {
        title: "Products",
        image: "Navbar/form.svg",
        icon: AiOutlineEdit,
        href: "/admin",
      },
      {
        title: "Update",
        image: "Navbar/form.svg",
        icon: AiOutlineEdit,
        href: "/admin/adminForm",
      },
    ],
  },
  {
    title: "Socials",
    icon: IoShareSocialSharp,
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
  const [mainMenuActive, setMainMenuActive] = useState<number | null>(null);
  const [subMenuActive, setSubMenuActive] = useState<number | null>(null);

  const toggleArrow = (index: number) => {
    return index === mainMenuActive && open ? (
      <AiOutlineDown className="text-sm font-light text-gray-900 dark:text-gray-300" />
    ) : (
      <AiOutlineLeft className="text-sm font-light text-gray-900 dark:text-gray-300" />
    );
  };

  return (
    <div className="stickyClass top-[calc(100px+0.5rem)] w-auto dark:bg-[#2b313a] h-full bg-stone-200/25 z-50 lg:block md:block hidden ">
      <div
        className={`${
          open ? "w-80" : "w-16"
        }  dark:bg-[#2b3039] bg-stone-200/25 h-full border rounded-lg lg:dark:border-gray-400/25 lg:border-gray-800/25  p-3 pt-8 text-gray-900 dark:text-gray-300 relative duration-300 `}
      >
        <div
          className={`absolute cursor-pointer -right-3 top-9 w-10 h-10 text-gray-900 dark:text-gray-300 flex items-center justify-center bg-sidebar border border-stone-400 dark:border-stone-400/25 rounded-full ${
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
            const IconOrImage = Menu.icon || Menu.image;
            const isIcon = !!Menu.icon;

            return (
              <li
                key={index}
                className={`flex flex-col rounded-md p-2 cursor-pointer text-gray-900 dark:text-gray-300 text-sm ${
                  open ? "flex-container gap-x-4 mt-4" : "mt-2"
                } ${
                  (index === mainMenuActive && !Menu.subNav) ||
                  (index === mainMenuActive && subMenuActive === null)
                    ? "bg-slate-300 dark:bg-[#545454]"
                    : ""
                } `}
                onClick={() => {
                  if (Menu.subNav) {
                    if (index === mainMenuActive) {
                      setMainMenuActive(null);
                      setSubMenuActive(null);
                    } else {
                      setMainMenuActive(index);
                      setSubMenuActive(null);
                    }
                  } else if (Menu.href) {
                    // Only set as active if href is defined
                    setMainMenuActive(index);
                    setSubMenuActive(null);
                  }
                }}
                style={{
                  fontWeight:
                    (index === mainMenuActive && !Menu.subNav) ||
                    (index === mainMenuActive && subMenuActive === null)
                      ? "bold"
                      : "normal",
                  color:
                    (index === mainMenuActive && !Menu.subNav) ||
                    (index === mainMenuActive && subMenuActive === null)
                      ? "#2a2a2a"
                      : "#545454",
                }}
              >
                <div
                  className={`${
                    open ? "flex" : ""
                  } items-center gap-x-4 text-gray-900 dark:text-gray-300`}
                >
                  {Menu.href ? (
                    <Link href={Menu.href}>
                      {" "}
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
                  ) : (
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
                  )}
                  {Menu.href ? (
                    <Link href={Menu.href}>
                      {" "}
                      {/* Render Link only if href is defined */}
                      <span
                        className={`${
                          !open && "hidden"
                        } origin-left duration-200`}
                      >
                        {Menu.title}
                      </span>
                    </Link>
                  ) : (
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {Menu.title}
                    </span>
                  )}
                  {open && Menu.subNav && toggleArrow(index)}
                </div>
                {Menu.subNav && (
                  <motion.ul
                    variants={subNavVariants}
                    initial="open"
                    animate={
                      index === mainMenuActive && open ? "open" : "closed"
                    }
                    className="flex flex-col text-gray-900 dark:text-gray-300 w-full pl-10"
                  >
                    {Menu.subNav.map((subItems, subIndex) => {
                      const SubIcon = subItems.icon;
                      return (
                        <motion.li
                          key={subIndex}
                          variants={itemVariants}
                          className="flex items-center gap-x-4 p-2 mt-4"
                          style={{
                            backgroundColor:
                              (index === mainMenuActive &&
                                subIndex === subMenuActive) ||
                              (index === mainMenuActive &&
                                subMenuActive === null)
                                ? "#383838 "
                                : "transparent",
                            fontWeight:
                              (index === mainMenuActive &&
                                subIndex === subMenuActive) ||
                              (index === mainMenuActive &&
                                subMenuActive === null)
                                ? "bold"
                                : "normal",
                            borderRadius: "0.375rem",
                          }}
                          onClick={() => {
                            setMainMenuActive(index);
                            setSubMenuActive(subIndex);
                          }}
                        >
                          {subItems.href ? (
                            <Link href={subItems.href}>
                              {" "}
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.8, rotate: -10 }}
                              >
                                {SubIcon && (
                                  <SubIcon className="text-xl text-gray-900 dark:text-gray-300" />
                                )}
                              </motion.div>
                            </Link>
                          ) : (
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              whileTap={{ scale: 0.8, rotate: -10 }}
                            >
                              {SubIcon && (
                                <SubIcon className="text-xl text-gray-900 dark:text-gray-300" />
                              )}
                            </motion.div>
                          )}
                          {subItems.href ? (
                            <Link href={subItems.href}>
                              {" "}
                              {/* Render Link only if href is defined */}
                              <span>{subItems.title}</span>
                            </Link>
                          ) : (
                            <span>{subItems.title}</span>
                          )}
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

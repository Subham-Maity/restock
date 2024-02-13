import React, { useState } from "react";
import {
  activeNavItemClasses,
  activeSubNavItemClasses,
  navConfig,
  subNavItemTitleFontClasses,
} from "@/components/common/home/home-side-nav/config/side-nav-setting";
import Link from "next/link";
import { TERipple } from "tw-elements-react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { SidenavControlProps } from "@/components/common/home/home-side-nav/config/sidenav-interface";

const SidenavNavLinkControl: React.FC<SidenavControlProps> = ({ open }) => {
  const [activeSubNav, setActiveSubNav] = useState<string | null>(null);
  const [activeLayeredSubNav, setActiveLayeredSubNav] = useState<string | null>(
    null,
  );
  const router = useRouter();
  const path = usePathname();
  const handleSubNavToggle = (title: string) => {
    setActiveSubNav((prevActiveSubNav) =>
      prevActiveSubNav === title ? null : title,
    );
  };

  const handleLayeredSubNavItemClick = (title: string) => {
    setActiveLayeredSubNav((prevActiveSubNav) =>
      prevActiveSubNav === title ? null : title,
    );
  };
  return (
    <div className="mx-2 rounded-md">
      {navConfig.map((item, index) => (
        <div key={index}>
          <Link
            href={item.href}
            onClick={() => {
              if (open) {
                handleSubNavToggle(item.title);
              } else {
                router.push(item.href);
              }
            }}
          >
            <TERipple
              rippleColor="light"
              rippleDuration={1000}
              className="w-full my-1.5"
            >
              <div
                className={`${
                  open
                    ? `flex items-center justify-between px-2 py-3 ${
                        activeSubNav === item.title && activeNavItemClasses
                      }`
                    : "flex items-center justify-center py-1"
                } ${path === item.href ? activeNavItemClasses : ""}`}
              >
                <div
                  className={`flex items-center ${
                    open ? "justify-start" : "justify-center "
                  } w-full p-1`}
                >
                  <item.icon />
                  {open && (
                    <span className="ml-2 text-sm font-medium">
                      {item.title}
                    </span>
                  )}
                </div>

                {item.subNav && (
                  <div className={`${!open && "hidden"} `}>
                    {activeSubNav === item.title ? (
                      <FiChevronDown
                        className={`${
                          open ? "text-xl" : "text-xl text-center"
                        }`}
                      />
                    ) : (
                      <FiChevronRight
                        className={`${
                          open ? "text-xl" : "text-xl text-center"
                        }`}
                      />
                    )}
                  </div>
                )}
              </div>
            </TERipple>
          </Link>
          {item.subNav && activeSubNav === item.title && (
            <div className="pl-4 my-1">
              {item.subNav.map((subNavItem, index) => (
                <div key={index}>
                  <Link
                    href={subNavItem.href}
                    onClick={() =>
                      handleLayeredSubNavItemClick(subNavItem.title)
                    }
                  >
                    <div
                      className={`${
                        open
                          ? "flex items-center justify-between w-full"
                          : "flex items-center justify-center w-full"
                      } ${
                        activeLayeredSubNav === subNavItem.title
                          ? activeSubNavItemClasses
                          : ""
                      }`}
                    >
                      <TERipple
                        rippleColor="light"
                        rippleDuration={1000}
                        className="w-full"
                      >
                        <div
                          className={`flex py-3 px-2 items-center justify-start ${
                            open ? "block" : "hidden"
                          }`}
                        >
                          <subNavItem.icon />
                          {open && (
                            <span className={subNavItemTitleFontClasses}>
                              {subNavItem.title}
                            </span>
                          )}
                        </div>
                      </TERipple>
                      {subNavItem.subNav && (
                        <div className={`${!open && "hidden"}`}>
                          {activeLayeredSubNav === subNavItem.title ? (
                            <FiChevronDown
                              className={`${
                                open ? "text-xl" : "text-xl text-center"
                              }`}
                            />
                          ) : (
                            <FiChevronRight
                              className={`${
                                open ? "text-xl" : "text-xl text-center"
                              }`}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                  {subNavItem.subNav &&
                    activeLayeredSubNav === subNavItem.title && (
                      <div className={`${!open && "hidden"} pl-4`}>
                        {subNavItem.subNav.map((layeredSubNavItem, index) => (
                          <Link
                            href={layeredSubNavItem.href}
                            key={index}
                            onClick={() =>
                              handleLayeredSubNavItemClick(
                                layeredSubNavItem.title,
                              )
                            }
                          >
                            <div
                              className={`${
                                open
                                  ? "flex items-center justify-between"
                                  : "flex items-center justify-center"
                              }`}
                            >
                              <TERipple
                                rippleColor="light"
                                rippleDuration={1000}
                                className="w-full"
                              >
                                <div
                                  className={`flex py-3 px-2 items-center justify-start ${
                                    open ? "block" : "hidden"
                                  }`}
                                >
                                  <layeredSubNavItem.icon />
                                  {open && (
                                    <span
                                      className={subNavItemTitleFontClasses}
                                    >
                                      {layeredSubNavItem.title}
                                    </span>
                                  )}
                                </div>
                              </TERipple>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidenavNavLinkControl;

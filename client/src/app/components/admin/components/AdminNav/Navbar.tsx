"use client";
import React, { useEffect, useState } from "react";

import { RiMenu2Fill } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";
import dynamic from "next/dynamic";
import { selectAllProducts_ } from "@/app/components/products/pages/pc-components/productListSlice";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/app/components/user/userSlice";
import { selectLoggedInUser } from "@/app/components/auth/authSlice";
import { BsGpuCard } from "react-icons/bs";
import { selectItems } from "@/app/components/cart/cartSlice";
import Link from "next/link";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const [isCartHoverOpen, setIsCartHoverOpen] = useState(false);
  const [cartHoverTimeout, setCartHoverTimeout] = useState(null);
  const user = useSelector(selectUserInfo);
  const users = useSelector(selectLoggedInUser);
  const role = users?.role;
  const itemsForSearch = useSelector(selectAllProducts_);

  const handleCartIconHover = () => {
    setIsCartHoverOpen(true);
    // Clear any previous timeouts
    if (cartHoverTimeout) {
      clearTimeout(cartHoverTimeout);
    }
  };

  const handleCartIconHoverOut = () => {
    const timeoutId: any = setTimeout(() => {
      setIsCartHoverOpen(false);
    }, 500);

    setCartHoverTimeout(timeoutId);
  };

  const items = useSelector(selectItems);
  //Navigation
  const navigation = [
    {
      id: 1,
      name: "Pc Components Admin",
      href: "/admin",
      icon: <BsGpuCard />,
      current: true,
      admin: true,
    },
  ];

  const userNavigation = [
    { name: "Your Profile Setting", href: "/UserProfile" },
    { name: "My Orders", href: "/orders" },
  ];
  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl  max-w-8xl px-4 sm:px-6 lg:px-4 py-2 sm:py-2 lg:py-2 dark:bg-[#2b3039] bg-stone-200/25 border-b lg:border lg:dark:border-gray-400/25 lg:border-gray-800/25 ">
      <div className="flex h-12 items-center justify-between ">
        <div>
          <div className=" flex  items-center space-x-4 gap-0 lg:gap-0">
            <div>
              <RiMenu2Fill
                size={25}
                className={`hover:cursor-pointer lg:hidden `}
                onClick={() => {
                  toggleSidebar();
                }}
              />
            </div>
            <h1 className="dark:text-white text-left text-black ml-2 font-bold whitespace-nowrap text-2xl lg:hidden block">
              Purple Sale
            </h1>
            {navigation.map((item) =>
              role === "admin" ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 bg-opacity-90 md:rounded-md dark:bg-[#545454] dark:bg-opacity-70 text-white"
                      : "text-gray-300 dark:hover:bg-gray-600 dark:bg-opacity-95 hover:bg-gray-300 hover:bg-opacity-95",
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <div className="dark:text-white flex space-x-1 text-black mr-2">
                    <span className="my-auto">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                </Link>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });

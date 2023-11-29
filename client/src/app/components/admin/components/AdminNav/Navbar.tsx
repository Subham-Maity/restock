"use client";
import { RiMenu2Fill } from "react-icons/ri";
import dynamic from "next/dynamic";

import Switcher from "@/app/components/Mode/Switcher";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/app/components/user/userSlice";
import { selectItems } from "@/app/components/cart/cartSlice";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import CartHoverOnMouse from "@/app/components/cart/CartHoverOnMouse";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const [isCartHoverOpen, setIsCartHoverOpen] = useState(false);
  const [cartHoverTimeout, setCartHoverTimeout] = useState(null);
  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const userNavigation = [
    { name: "Your Profile Setting", href: "/UserProfile" },
    { name: "My Orders", href: "/orders" },
  ];

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

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

    // Store the timeout ID in state for future reference
    setCartHoverTimeout(timeoutId);
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl  px-4 sm:px-6 lg:px-4 py-2 sm:py-2 lg:py-2 dark:bg-[#2b3039] bg-stone-200/25 border-b lg:border lg:dark:border-gray-400/25 lg:border-gray-800/25 ">
      <div className="flex h-12 items-center justify-between ">
        <div className=" flex items-center space-x-4 gap-0 lg:gap-0">
          <div>
            <RiMenu2Fill
              size={25}
              className={`hover:cursor-pointer lg:hidden `}
              onClick={() => {
                toggleSidebar();
              }}
            />
          </div>
          <h1 className="dark:text-white text-left text-black ml-2 font-bold whitespace-nowrap text-2xl">
            Restock
          </h1>
        </div>
        <div className="flex gap-2">
          <div className=" ml-auto">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                onMouseEnter={handleCartIconHover}
                onMouseLeave={handleCartIconHoverOut}
                className="rounded-xl bg-gray-500 hover:bg-gray-600 p-1.5 text-white dark:bg-gray-700
                      dark:hover:text-white dark:hover:bg-gray-600 drop focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:cursor-pointer cursor-pointer"
              >
                <Link href={"/cart"}>
                  <ShoppingCartIcon className="h-6 w-6" />
                </Link>
                {isCartHoverOpen && <CartHoverOnMouse />}
              </button>
              {items.length > 0 && (
                <span className="inline-flex items-center mb-7 -ml-3 rounded-full font-bold bg-green-600 px-2 py-1 text-xs text-white ring-1 ring-inset">
                  {items.length}
                </span>
              )}

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex  items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only ">Open user menu</span>

                    <div className="flex-shrink-0">
                      {user &&
                      user.addresses &&
                      user.addresses[0] &&
                      user.addresses[0].dpUrl ? (
                        <Image
                          className="h-10 w-10 p-0.5 rounded-full bg-gray-500 dark:bg-gray-500 flex items-center justify-center text-white dark:hover:bg-gray-300 drop focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-lg"
                          src={user.addresses[0].dpUrl}
                          alt=""
                          width={40}
                          height={40}
                        />
                      ) : user && user.email ? (
                        <div
                          className="h-9 w-9 rounded-full bg-gray-500 dark:bg-gray-700 flex items-center justify-center text-white dark:hover:bg-gray-600 drop focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-lg"
                          style={{ fontSize: "1.5rem" }}
                        >
                          <p className="mt-1">{user.email[0].toUpperCase()}</p>
                        </div>
                      ) : (
                        <Image
                          className="h-10 w-10 p-2 rounded-full bg-gray-500 dark:bg-gray-700 flex items-center justify-center text-white dark:hover:bg-gray-600 drop focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-lg"
                          src="/Navbar/blankUser.svg"
                          alt=""
                          width={40}
                          height={40}
                        />
                      )}
                    </div>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-50 mt-8  origin-top-right bg-slate-200 dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-2xl">
                    <div>
                      <div className="text-sm ml-4 mb-2 mt-4 font-medium leading-none text-gray-800 dark:text-gray-300">
                        {user?.addresses && user.addresses[0]
                          ? user.addresses[0].name
                          : "No Name Provided"}
                      </div>
                      <div className="text-sm ml-4 mb-2 mt-4 font-bold leading-none text-gray-950 dark:text-gray-300 ">
                        {user?.email && user.email
                          ? user.email
                          : "No Email Provided"}
                      </div>
                    </div>
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link
                            href={item.href}
                            className={classNames(
                              active
                                ? " bg-gray-400 dark:bg-gray-500 text-gray-950"
                                : "",
                              "font-medium block px-4 py-2 text-sm text-gray-950 dark:text-gray-300 rounded-2xl",
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                    <div>
                      {user ? (
                        <Link
                          href="/logout"
                          className="block px-4 py-2 text-sm font-bold text-gray-900 dark:text-gray-200 rounded-2xl hover:bg-red-600/90 cursor-pointer bg-red-500/90"
                        >
                          Logout
                        </Link>
                      ) : (
                        <Link
                          href="/login"
                          className="block px-4 py-2 text-sm font-bold text-gray-900 dark:text-gray-200 rounded-2xl hover:bg-green-600/90 cursor-pointer bg-green-500"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <div>
            <Switcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });

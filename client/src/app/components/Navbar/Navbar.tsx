"use client";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BiSolidOffer,
  BiSolidMouseAlt,
  BiSolidUserCheck,
} from "react-icons/bi";
import { TbBrandSupabase } from "react-icons/tb";
import { BsGpuCard } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import Switcher from "@/app/components/Mode/Switcher";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "@/app/components/cart/cartSlice";
import { usePathname } from "next/navigation";
import CartHoverOnMouse from "@/app/components/cart/CartHoverOnMouse";
import { selectLoggedInUser } from "@/app/components/auth/authSlice";
import { selectUserInfo } from "@/app/components/user/userSlice";

import {
  fetchAllStoreProductsAsync,
  selectAllProducts_,
} from "@/app/components/products/pages/pc-components/productListSlice";
import NavbarSearch from "@/app/components/Navbar/NavbarSearch";

const navigation = [
  {
    id: 1,
    name: "Deals of The Day",
    href: "/",
    icon: <BiSolidOffer />,
    user: true,
  },
  {
    id: 2,
    name: "Brand Store",
    href: "/brand",
    icon: <TbBrandSupabase />,
    user: true,
  },
  {
    id: 3,
    name: "PC Components",
    href: "/pc-components",
    icon: <BsGpuCard />,
    user: true,
  },
  {
    id: 4,
    name: "PC Peripherals",
    href: "/peripherals",
    icon: <BiSolidMouseAlt />,
    user: true,
  },
  {
    id: 5,
    name: "Admin",
    href: "/admin",
    icon: <BiSolidUserCheck />,
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

const Navbar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAllStoreProductsAsync);
  }, []);

  const [isCartHoverOpen, setIsCartHoverOpen] = useState(false);
  const [cartHoverTimeout, setCartHoverTimeout] = useState(null);
  const pathname = usePathname();
  const user = useSelector(selectUserInfo);
  const users = useSelector(selectLoggedInUser);
  const role = users?.role;
  const itemsForSearch = useSelector(selectAllProducts_);

  console.log("pathname", pathname);

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

  const items = useSelector(selectItems);

  return (
    <div className="fixed top-0 left-0 right-0 rounded-b-lg z-50 backdrop-blur-3xl">
      <Disclosure
        as="nav"
        className="bg-white/50 dark:bg-[#1a1a1a]/70 rounded-b-xl"
      >
        {({ open }) => (
          <>
            <div className="lg:mx-16 max-w-8xl px-5 sm:px-6 xl:px-8 py-2 sm:py-2 lg:py-2">
              <div className="flex h-16 items-center justify-between lg:justify-start">
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-8">
                    <Link href="/">
                      <Image
                        className="h-8 w-8"
                        src="https://img.freepik.com/free-vector/modern-desktop-compute-concept-illustration_114360-12156.jpg"
                        alt="Your Company"
                        width={32}
                        height={32}
                      />
                    </Link>
                  </div>

                  <div className="hidden xl:block">
                    <div className="flex items-center space-x-4">
                      {navigation.map((item) =>
                        role === "admin" ||
                        (!role && item.user) ||
                        (role === "user" && item.user) ? (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              pathname === item.href
                                ? "bg-gray-100 bg-opacity-90 md:rounded-lg dark:bg-gray-500 dark:bg-opacity-70 text-white"
                                : "text-gray-300 dark:hover:bg-gray-600 dark:bg-opacity-95 hover:bg-gray-300 hover:bg-opacity-95",
                              "flex items-center rounded-lg px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={
                              pathname === item.href ? "page" : undefined
                            }
                          >
                            <div className="dark:text-white flex space-x-1 text-black mr-2">
                              <span className="my-auto">{item.icon}</span>
                              <span>{item.name}</span>
                            </div>
                          </Link>
                        ) : null
                      )}
                    </div>
                  </div>

                  <div>
                    <NavbarSearch items={itemsForSearch} />
                  </div>
                </div>
                <div className="hidden lg:block ml-auto">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      onMouseEnter={handleCartIconHover}
                      onMouseLeave={handleCartIconHoverOut}
                      className="rounded-xl bg-gray-500 hover:bg-gray-600 p-1.5 text-white dark:bg-gray-700
                      dark:hover:text-white dark:hover:bg-gray-600 drop focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:cursor-pointer cursor-pointer"
                    >
                      <Link href={"/cart"}>
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
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
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only xl:hidden">
                            Open user menu
                          </span>

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
                                <p className="mt-1">
                                  {user.email[0].toUpperCase()}
                                </p>
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
                        <Menu.Items className="absolute right-0 z-50 mt-8 w-48 origin-top-right bg-slate-200 dark:bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-2xl">
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
                                      ? "bg-gray-400 dark:bg-gray-500"
                                      : "",
                                    "block px-4 py-2 text-sm dark:text-gray-200 rounded-2xl"
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
                                className="block px-4 py-2 text-sm font-bold dark:text-gray-200 rounded-2xl hover:bg-gray-400 hover:dark:bg-gray-500 cursor-pointer"
                              >
                                Logout
                              </Link>
                            ) : (
                              <Link
                                href="/login"
                                className="block px-4 py-2 text-sm font-bold dark:text-gray-200 rounded-2xl hover:bg-gray-400 hover:dark:bg-gray-500 cursor-pointer"
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
                <div className="mt-2 ml-4 lg:block hidden">
                  <Switcher />
                </div>

                {/* Mobile menu button */}
                <div className="flex xl:hidden ">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/*Mobile View*/}
            <Disclosure.Panel className="xl:hidden rounded-b-2xl">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) =>
                  role === "admin" ||
                  (!role && item.user) ||
                  (role === "user" && item.user) ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? "bg-gray-100 bg-opacity-90 md:rounded-lg dark:bg-gray-500 dark:bg-opacity-70 text-white"
                          : "text-gray-300 dark:hover:bg-gray-600 dark:bg-opacity-95 hover:bg-gray-300 hover:bg-opacity-95",
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      <div className="dark:text-white flex space-x-1 text-black mr-2">
                        <span className="my-auto">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ) : null
                )}
              </div>

              <div className="border-t border-gray-700 pb-3 pt-4 ">
                <div className="flex items-center px-5 ">
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

                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-800 dark:text-white">
                      {user?.addresses && user.addresses[0]
                        ? user.addresses[0].name
                        : "No Name Provided"}
                    </div>
                    <div className="text-sm font-bold leading-none text-gray-950 dark:text-gray-200 ">
                      {user?.email && user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-xl bg-gray-500 hover:bg-gray-600 p-1 text-white dark:bg-gray-700 dark:hover:text-white dark:hover:bg-gray-600 drop focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 lg:hidden"
                  >
                    <span className="sr-only">View notifications</span>
                    <Link href={"/cart"}>
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                  </button>
                  {items.length > 0 && (
                    <span className="inline-flex items-center mb-7 -ml-3 rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/10 opacity-75 lg:hidden">
                      {items.length}
                    </span>
                  )}
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-950 dark:text-gray-200 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <Switcher />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
